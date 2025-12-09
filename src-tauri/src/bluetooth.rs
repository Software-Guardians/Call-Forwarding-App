use crate::protocol::{CommandPayload, ProtocolMessage};
use btleplug::api::{Central, Manager as _, Peripheral, ScanFilter};
use btleplug::platform::Manager;
use std::time::Duration;
use tauri::{AppHandle, Emitter};
use tokio::time;

pub struct BluetoothManager;

impl BluetoothManager {
    pub async fn start_scan(app: &AppHandle) -> Result<(), String> {
        let manager = Manager::new().await.map_err(|e| e.to_string())?;
        let adapters = manager.adapters().await.map_err(|e| e.to_string())?;
        let central = adapters
            .into_iter()
            .nth(0)
            .ok_or("No Bluetooth adapter found")?;

        central
            .start_scan(ScanFilter::default())
            .await
            .map_err(|e| e.to_string())?;
        time::sleep(Duration::from_secs(2)).await;

        for peripheral in central.peripherals().await.map_err(|e| e.to_string())? {
            let properties = peripheral.properties().await.map_err(|e| e.to_string())?;
            if let Some(prop) = properties {
                println!("Discovered: {:?}", prop.local_name);
            }
        }

        // --- SIMULATION OF PROTOCOL HANDSHAKE ---
        println!("Simulating incoming connection...");
        time::sleep(Duration::from_secs(1)).await;

        // Simulate receiving a CALL_STATE JSON
        let fake_input =
            r#"{"type": "CALL_STATE", "payload": {"state": "RINGING", "number": "+905551234567"}}"#;
        println!("Received (Simulated): {}", fake_input);

        if let Ok(msg) = serde_json::from_str::<ProtocolMessage>(fake_input) {
            println!("Parsed Protocol Message: {:?}", msg);
            match msg {
                ProtocolMessage::CallState(payload) => {
                    println!("Emitting call-state event...");
                    app.emit("call-state-update", payload)
                        .map_err(|e| e.to_string())?;
                }
                _ => {}
            }
        }

        Ok(())
    }

    pub fn send_command(action: String, number: Option<String>) -> Result<(), String> {
        let cmd = ProtocolMessage::Command(CommandPayload { action, number });

        let json = serde_json::to_string(&cmd).map_err(|e| e.to_string())?;
        println!("Sending JSON (Simulated Write): {}", json);
        // In real app, write bytes + \n to socket here.

        Ok(())
    }
}

#[tauri::command]
pub async fn start_scan(app: AppHandle) -> Result<String, String> {
    println!("Starting Bluetooth scan...");

    // In a real app, we'd spawn this off or manage state persistently.
    match BluetoothManager::start_scan(&app).await {
        Ok(_) => Ok("Scan and Simulation completed successfully".to_string()),
        Err(e) => Err(format!("Scan failed: {}", e)),
    }
}

#[tauri::command]
pub fn send_command(action: String, number: Option<String>) -> Result<(), String> {
    BluetoothManager::send_command(action, number)
}
