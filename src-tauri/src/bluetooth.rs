// use crate::protocol::{CommandPayload, ProtocolMessage};
use bluer::{
    rfcomm::{Profile, Role},
    Session,
}; // Corrected imports
use futures::StreamExt; // For handle.next()
use serde::Serialize;
use std::str::FromStr;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter, Manager};
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::sync::{Mutex, Notify};
use uuid::Uuid;

// Custom UUID for Aura Link Application
const SERVICE_UUID: &str = "a49ecc15-cb06-495c-9f4f-bb80a90cdf00";

#[derive(Clone, Serialize)]
struct ConnectionStateEvent {
    state: String,
    device_name: Option<String>,
    device_address: Option<String>,
}

pub struct BluetoothAppState {
    // We store the WriteHalf of the RFCOMM stream
    pub output_stream: Mutex<Option<tokio::io::WriteHalf<bluer::rfcomm::Stream>>>,
    pub last_activity: Mutex<Instant>,
    pub disconnect_notify: Arc<Notify>,
}

impl Default for BluetoothAppState {
    fn default() -> Self {
        Self {
            output_stream: Mutex::new(None),
            last_activity: Mutex::new(Instant::now()),
            disconnect_notify: Arc::new(Notify::new()),
        }
    }
}

pub struct BluetoothManager;

impl BluetoothManager {
    pub async fn start_server(app: AppHandle) -> Result<(), String> {
        println!("Starting Bluetooth Server for Aura Link...");
        let session = Session::new().await.map_err(|e| e.to_string())?;
        let adapter = session.default_adapter().await.map_err(|e| e.to_string())?;

        // Ensure Bluetooth is on
        if !adapter.is_powered().await.map_err(|e| e.to_string())? {
            println!("Bluetooth not powered, turning on...");
            let _ = adapter.set_powered(true).await;
        }

        // Register SPP Profile
        let uuid = Uuid::from_str(SERVICE_UUID).map_err(|e| e.to_string())?;

        // Correct Usage of bluer::rfcomm::Profile
        let profile = Profile {
            uuid,
            name: Some("Aura Link PC".to_string()),
            channel: Some(15),
            role: Some(Role::Server),
            require_authentication: Some(false),
            require_authorization: Some(false),
            auto_connect: Some(true),
            ..Default::default()
        };

        println!("Registering Profile with UUID: {}", SERVICE_UUID);

        // We need to keep the handle alive
        let mut handle = session
            .register_profile(profile)
            .await
            .map_err(|e| e.to_string())?;

        println!("Profile Registered! Waiting for connections...");

        loop {
            println!("Waiting for incoming connection request...");
            match handle.next().await {
                Some(req) => {
                    println!("Connection Request Received from: {}", req.device());
                    let device_addr = req.device();

                    // Accept the connection
                    match req.accept() {
                        Ok(stream) => {
                            println!("Connection Accepted!");

                            let (reader, writer) = tokio::io::split(stream);

                            let state = app.state::<BluetoothAppState>();
                            *state.last_activity.lock().await = Instant::now();

                            // Get Device Name
                            // let device_addr = req.device(); // Already captured
                            let mut device_name = "Android Phone".to_string(); // Default

                            if let Ok(device) = adapter.device(device_addr) {
                                if let Ok(alias) = device.alias().await {
                                    device_name = alias;
                                }
                            }

                            let app_handle_clone = app.clone();
                            let payload = ConnectionStateEvent {
                                state: "connected".to_string(),
                                device_name: Some(device_name),
                                device_address: Some(device_addr.to_string()),
                            };
                            let _ = app.emit("connection-state", payload);

                            // Store Writer
                            *state.output_stream.lock().await = Some(writer);

                            // Spawn Heartbeat Loop
                            let heartbeat_app = app.clone();
                            tauri::async_runtime::spawn(async move {
                                println!("Starting Heartbeat Loop...");
                                loop {
                                    tokio::time::sleep(Duration::from_secs(5)).await;
                                    let state = heartbeat_app.state::<BluetoothAppState>();
                                    let mut guard = state.output_stream.lock().await;
                                    if let Some(w) = guard.as_mut() {
                                        let hb = r#"{"type":"HEARTBEAT"}"#;
                                        let line = format!("{}\n", hb);
                                        if let Err(e) = w.write_all(line.as_bytes()).await {
                                            println!("Heartbeat failed: {}", e);
                                            break; // connection lost
                                        }
                                        let _ = w.flush().await;
                                    } else {
                                        break; // No connection
                                    }
                                }
                                println!("Heartbeat loop stopped.");
                            });

                            // Read Loop
                            let mut buf_reader = BufReader::new(reader);
                            let mut line = String::new();
                            let disconnect_notify = state.disconnect_notify.clone();

                            loop {
                                line.clear();
                                tokio::select! {
                                        _ = disconnect_notify.notified() => {
                                            println!("Disconnect requested locally via UI.");
                                            break;
                                        }
                                        read_res = buf_reader.read_line(&mut line) => {
                                            match read_res {
                                                Ok(0) => break, // EOF
                                                Ok(_) => {
                                            let trimmed = line.trim();
                                            if !trimmed.is_empty() {
                                                let state =
                                                    app_handle_clone.state::<BluetoothAppState>();
                                                *state.last_activity.lock().await = Instant::now();

                                                match serde_json::from_str::<serde_json::Value>(trimmed)
                                                {
                                                    Ok(json_val) => {
                                                        if let Some(msg_type) = json_val
                                                            .get("type")
                                                            .and_then(|v| v.as_str())
                                                        {
                                                            if msg_type == "CALL_STATE" {
                                                                let _ = app_handle_clone.emit(
                                                                    "call-state-update",
                                                                    json_val.get("payload"),
                                                                );
                                                            } else if msg_type == "CONTACTS_DATA" {
                                                                let _ = app_handle_clone.emit(
                                                                    "contacts-update",
                                                                    json_val.get("payload"),
                                                                );
                                                            } else if msg_type == "HANDSHAKE" {
                                                                println!("Handshake received!");
                                                            }
                                                        }
                                                        let _ = app_handle_clone
                                                            .emit("bluetooth-message", json_val);
                                                    }
                                                    Err(e) => println!("JSON Error: {}", e),
                                                }
                                            }
                                        }
                                        Err(e) => {
                                            println!("Read Error: {}", e);
                                            break;
                                        }
                                    }
                                    } // End select! match
                                }
                            } // End loop

                            println!("Connection lost.");
                            let payload = ConnectionStateEvent {
                                state: "disconnected".to_string(),
                                device_name: None,
                                device_address: None,
                            };
                            let _ = app.emit("connection-state", payload);
                            *state.output_stream.lock().await = None;
                        }
                        Err(e) => {
                            println!("Failed to accept connection: {}", e);
                        }
                    }
                }
                None => {
                    println!("Profile Agent Stopped.");
                    break;
                }
            }
        }

        Ok(())
    }

    pub async fn send_command(
        app: &AppHandle,
        action: String,
        number: Option<String>,
    ) -> Result<(), String> {
        use crate::protocol::{CommandPayload, ProtocolMessage};

        let payload = CommandPayload { action, number };
        let msg = ProtocolMessage::Command(payload);
        let json = serde_json::to_string(&msg).map_err(|e| e.to_string())?;
        let line = json + "\n";

        let state = app.state::<BluetoothAppState>();
        let mut writer_guard = state.output_stream.lock().await;

        if let Some(writer) = writer_guard.as_mut() {
            writer
                .write_all(line.as_bytes())
                .await
                .map_err(|e| e.to_string())?;
            writer.flush().await.map_err(|e| e.to_string())?;
            println!("Sent: {}", line.trim());
            Ok(())
        } else {
            Err("Not connected".to_string())
        }
    }

    pub async fn disconnect_device(app: &AppHandle) {
        use crate::protocol::{DisconnectPayload, ProtocolMessage};
        use tokio::time::timeout;

        println!("Initiating Disconnect Sequence...");

        let state = app.state::<BluetoothAppState>();

        // 1. Try to send DISCONNECT message (Best Effort with Timeout)
        // We use a timeout to prevent hanging if the lock is held or write blocks
        let send_result = timeout(Duration::from_millis(1000), async {
            let mut writer_guard = state.output_stream.lock().await;
            if let Some(writer) = writer_guard.as_mut() {
                let msg = ProtocolMessage::Disconnect(DisconnectPayload {});
                if let Ok(json) = serde_json::to_string(&msg) {
                    let line = json + "\n";
                    if let Err(e) = writer.write_all(line.as_bytes()).await {
                        println!("Failed to write disconnect msg: {}", e);
                    } else {
                        let _ = writer.flush().await;
                        println!("Sent DISCONNECT message to device.");
                    }
                }
            }
            // Small delay to ensure data hits the wire before we kill the socket
            tokio::time::sleep(Duration::from_millis(100)).await;
        })
        .await;

        if send_result.is_err() {
            println!("Timeout sending disconnect message - forcing close.");
        }

        // 2. Trigger local disconnect logic (Wake up the read loop)
        state.disconnect_notify.notify_one();

        // 3. Force UI Update immediately (don't wait for loop to break)
        // This ensures the user feels the disconnect immediately.
        let payload = ConnectionStateEvent {
            state: "disconnected".to_string(),
            device_name: None,
            device_address: None,
        };
        let _ = app.emit("connection-state", payload);

        println!("Disconnect Sequence Completed.");
    }
}

// Deprecated stubs
#[tauri::command]
pub async fn start_scan(_app: AppHandle) -> Result<String, String> {
    Ok("Scanning deprecated in Server Mode".to_string())
}

#[tauri::command]
pub async fn connect_device(_app: AppHandle, _address: String) -> Result<String, String> {
    Ok("Manual connection deprecated in Server Mode".to_string())
}

#[tauri::command]
pub async fn send_command(
    app: AppHandle,
    action: String,
    number: Option<String>,
) -> Result<(), String> {
    BluetoothManager::send_command(&app, action, number).await
}

#[tauri::command]
pub async fn disconnect_device(app: AppHandle) -> Result<(), String> {
    BluetoothManager::disconnect_device(&app).await;
    Ok(())
}
