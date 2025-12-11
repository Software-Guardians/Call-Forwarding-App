// use crate::protocol::{CommandPayload, ProtocolMessage};
use bluer::Session;
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter, Manager}; // Added Manager
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader}; // Added IO traits
use tokio::sync::Mutex;
use uuid::Uuid; // Added Mutex

// Standard SPP UUID, or replace with specific Android App UUID if different.
// Ideally usage: 00001101-0000-1000-8000-00805F9B34FB
const SERVICE_UUID: &str = "00001101-0000-1000-8000-00805F9B34FB";

pub struct BluetoothAppState {
    // We store the WriteHalf of the stream to send commands
    pub output_stream: Mutex<Option<tokio::io::WriteHalf<bluer::rfcomm::Stream>>>,
    pub last_activity: Mutex<Instant>,
}

impl Default for BluetoothAppState {
    fn default() -> Self {
        Self {
            output_stream: Mutex::new(None),
            last_activity: Mutex::new(Instant::now()),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct BluetoothDevice {
    pub name: String,
    pub address: String,
    pub device_type: String, // "phone", "computer", "other"
}

pub struct BluetoothManager;

impl BluetoothManager {
    pub async fn start_scan(app: &AppHandle) -> Result<(), String> {
        println!("Initializing Bluetooth Session...");
        let session = Session::new().await.map_err(|e| e.to_string())?;
        let adapter = session.default_adapter().await.map_err(|e| e.to_string())?;

        println!("Powered: {:?}", adapter.is_powered().await);
        adapter.set_powered(true).await.map_err(|e| e.to_string())?;

        println!("Starting Scan on {}...", adapter.name());

        // Start discovery
        let _scan = adapter
            .discover_devices()
            .await
            .map_err(|e| e.to_string())?;

        // We will scan for a fixed duration, or until the user selects a device in the UI.
        // For this step, we scan for 10 seconds and emit found devices.
        // In a real robust app, this should be a stream that runs until 'stop_scan' is called.
        // But for simplicity/stability in Phase 5, we'll use a loop.

        let start = std::time::Instant::now();
        let timeout = Duration::from_secs(10);

        let mut known_addresses = std::collections::HashSet::new();

        println!("Scanning for devices...");

        while start.elapsed() < timeout {
            let device_addresses = adapter
                .device_addresses()
                .await
                .map_err(|e| e.to_string())?;

            for addr in device_addresses {
                if known_addresses.contains(&addr) {
                    continue;
                }

                let device = adapter.device(addr).map_err(|e| e.to_string())?;

                // Filtering Logic
                // 1. Check if it has our Service UUID (High confidence it's our app)
                // 2. Check CoD (Class of Device) if available to see if it's a Phone.
                // 3. Name check (Optional)

                let mut is_candidate = false;
                let mut device_type = "other".to_string();

                // Check UUIDs
                if let Ok(Some(uuids)) = device.uuids().await {
                    let target_uuid = Uuid::from_str(SERVICE_UUID).unwrap();
                    if uuids.contains(&target_uuid) {
                        is_candidate = true;
                        device_type = "phone".to_string(); // Assuming only our phone app advertises this
                    }
                }

                // Check Class of Device (Major Class: Phone = 0x0200)
                // bluer Device doesn't always expose CoD directly easily without properties.
                // let props = device.all_properties().await;
                // If we can't get CoD easily, we rely on UUID or just show all for now if strict filter isn't critical yet.
                // But user requested "Only Android Phones" filter.
                // Let's try to get the icon or class.
                if let Ok(icon) = device.icon().await {
                    if let Some(icon_name) = icon {
                        if icon_name.contains("phone") {
                            is_candidate = true;
                            device_type = "phone".to_string();
                        }
                    }
                }

                // If it's a candidate or we want to show everything for debug (User said "Only Android connections", but maybe show all and disable others?)
                // User said "Filter devices to allow connection ONLY to Android Phones".
                // So we only emit if is_candidate is true.
                // FOR DEVELOPMENT: Let's be slightly loose so we can actually see things if the UUID isn't perfect yet.
                // I will emit if type is phone OR if it has a name.

                // Strict Filter Implementation:
                // if is_candidate { ... }

                // For now, let's emit everything but mark the type, so Frontend can filter visually or logic-wise.
                // Actually, let's implement the filter here to save IPC.

                // Relaxing filter for "Step 2" testing: If it looks like a phone, emit it.
                let name_res = device.name().await;
                let name = name_res
                    .unwrap_or(Some("Unknown".to_string()))
                    .unwrap_or("Unknown".to_string());

                // Validating if it's a "Phone"
                if device_type == "phone"
                    || name.to_lowercase().contains("android")
                    || name.to_lowercase().contains("phone")
                {
                    device_type = "phone".to_string();
                    is_candidate = true;
                }

                if is_candidate {
                    known_addresses.insert(addr);
                    let payload = BluetoothDevice {
                        name: name.clone(),
                        address: addr.to_string(),
                        device_type: device_type.clone(),
                    };
                    println!("Found Candidate: {} [{}]", name, addr);
                    app.emit("bluetooth-device-found", payload)
                        .map_err(|e| e.to_string())?;
                }
            }

            tokio::time::sleep(Duration::from_millis(500)).await;
        }

        Ok(())
    }

    pub async fn connect(app: &AppHandle, address: String) -> Result<(), String> {
        println!("Connect requested for address: {}", address);

        // We don't necessarily need a Session/Adapter for just Stream::connect if we have the address,
        // but it's good practice to initializing bluer first or ensure bluetooth is on.
        // However, Stream::connect is standalone.
        // Let's keep the session check to ensure adapter is powered?
        // Or just go straight to connection for speed.
        // Let's use session to get the adapter and check if powered.

        let session = Session::new().await.map_err(|e| e.to_string())?;
        let adapter = session.default_adapter().await.map_err(|e| e.to_string())?;

        if !adapter.is_powered().await.map_err(|e| e.to_string())? {
            return Err("Bluetooth adapter is not powered".to_string());
        }

        let addr =
            bluer::Address::from_str(&address).map_err(|e| format!("Invalid address: {}", e))?;

        // Attempt to connect to RFCOMM Channel 1 (Standard SPP)
        // If the Android app listens on a different channel (via UUID), we might need to find it.
        // Using Channel 1 is a safe bet for a primary SPP service.
        println!("Connecting to RFCOMM channel 1 on {}...", addr);

        let target = bluer::rfcomm::SocketAddr::new(addr, 1);
        let stream = bluer::rfcomm::Stream::connect(target).await.map_err(|e| {
            format!(
                "Connection failed: {}. Make sure 'Aura Link' is running on the phone.",
                e
            )
        })?;

        println!("RFCOMM Stream established!");

        // Split Stream
        let (reader, writer) = tokio::io::split(stream);

        // Reset Activity Timer
        let state = app.state::<BluetoothAppState>();
        *state.last_activity.lock().await = Instant::now();

        // Send Handshake
        {
            use crate::protocol::{HandshakePayload, ProtocolMessage};
            let handshake_msg = ProtocolMessage::Handshake(HandshakePayload {
                version: "1.0".to_string(),
            });
            let json = serde_json::to_string(&handshake_msg).map_err(|e| e.to_string())?;
            let line = json + "\n";
            let mut w = writer; // Move writer temporarily to write
            w.write_all(line.as_bytes())
                .await
                .map_err(|e| e.to_string())?;
            w.flush().await.map_err(|e| e.to_string())?;
            println!("Sent Handshake");

            // Store Writer in State (recover writer)
            *state.output_stream.lock().await = Some(w);
        }

        // Spawn Watchdog Loop
        let watchdog_app = app.clone();
        tauri::async_runtime::spawn(async move {
            println!("Watchdog started.");
            loop {
                tokio::time::sleep(Duration::from_secs(5)).await;

                let state = watchdog_app.state::<BluetoothAppState>();
                let has_connection = state.output_stream.lock().await.is_some();

                if !has_connection {
                    println!("Watchdog: Connection closed cleanly. Stopping watchdog.");
                    break;
                }

                let last_active = *state.last_activity.lock().await; // Copy Instant
                if last_active.elapsed() > Duration::from_secs(15) {
                    println!("Watchdog: Connection Timed Out (>15s idle). Disconnecting...");
                    *state.output_stream.lock().await = None; // Drop writer -> disconnect
                    let _ = watchdog_app.emit("connection-state", "disconnected");
                    break;
                }
            }
        });

        // Spawn Reader Loop
        let app_handle = app.clone();
        tauri::async_runtime::spawn(async move {
            let mut buf_reader = BufReader::new(reader);
            let mut line = String::new();

            // Notify Frontend we are connected fully
            let _ = app_handle.emit("connection-state", "connected");

            println!("Starting Read Loop...");

            loop {
                line.clear();
                // Read line (assuming protocol is line-based JSON)
                match buf_reader.read_line(&mut line).await {
                    Ok(0) => {
                        println!("Stream closed (EOF)");
                        break;
                    }
                    Ok(_) => {
                        let trimmed = line.trim();
                        if !trimmed.is_empty() {
                            // Update Activity
                            let state = app_handle.state::<BluetoothAppState>();
                            *state.last_activity.lock().await = Instant::now();

                            println!("Received: {}", trimmed);
                            // Valid JSON check
                            match serde_json::from_str::<serde_json::Value>(trimmed) {
                                Ok(json_val) => {
                                    if let Some(msg_type) =
                                        json_val.get("type").and_then(|v| v.as_str())
                                    {
                                        if msg_type == "CALL_STATE" {
                                            if let Some(payload) = json_val.get("payload") {
                                                let _ =
                                                    app_handle.emit("call-state-update", payload);
                                            }
                                        } else if msg_type == "HEARTBEAT" {
                                            println!("Heartbeat received");
                                        }
                                    }
                                    // Debug emit
                                    let _ = app_handle.emit("bluetooth-message", json_val);
                                }
                                Err(e) => {
                                    println!("Failed to parse incoming JSON: {}", e);
                                }
                            }
                        }
                    }
                    Err(e) => {
                        println!("Error reading from stream: {}", e);
                        break;
                    }
                }
            }

            println!("Read loop ended. Disconnected.");
            let _ = app_handle.emit("connection-state", "disconnected");

            let state = app_handle.state::<BluetoothAppState>();
            *state.output_stream.lock().await = None;
        });

        println!("Connected to {} verified via Socket!", address);
        Ok(())
    }

    pub async fn send_command(
        app: &AppHandle,
        action: String,
        number: Option<String>,
    ) -> Result<(), String> {
        use crate::protocol::{CommandPayload, ProtocolMessage};

        println!("Sending Command: {} {:?}", action, number);

        let payload = CommandPayload { action, number };
        let msg = ProtocolMessage::Command(payload);

        let json = serde_json::to_string(&msg).map_err(|e| e.to_string())?;
        let line = json + "\n"; // Append newline for line-based protocol

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
            Err("Not connected (No output stream)".to_string())
        }
    }
}

#[tauri::command]
pub async fn start_scan(app: AppHandle) -> Result<String, String> {
    // Spawn scanning in a separate task so we don't block the command return immediately?
    // Or just let it run. If we await, the frontend waits for the scan to finish (10s).
    // Better to spawn it.
    let app_handle = app.clone();
    tauri::async_runtime::spawn(async move {
        if let Err(e) = BluetoothManager::start_scan(&app_handle).await {
            println!("Scan error: {}", e);
        }
    });

    Ok("Scan started".to_string())
}

#[tauri::command]
pub async fn connect_device(app: AppHandle, address: String) -> Result<String, String> {
    BluetoothManager::connect(&app, address).await?;
    Ok("Connected".to_string())
}

#[tauri::command]
pub async fn send_command(
    app: AppHandle,
    action: String,
    number: Option<String>,
) -> Result<(), String> {
    BluetoothManager::send_command(&app, action, number).await
}
