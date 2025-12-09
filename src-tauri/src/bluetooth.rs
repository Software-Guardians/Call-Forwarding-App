use btleplug::api::{Central, Manager as _, Peripheral, ScanFilter};
use btleplug::platform::Manager;
use std::time::Duration;
use tokio::time;

pub struct BluetoothManager;

impl BluetoothManager {
    pub async fn start_scan() -> Result<(), String> {
        let manager = Manager::new().await.map_err(|e| e.to_string())?;
        let adapters = manager.adapters().await.map_err(|e| e.to_string())?;
        let central = adapters.into_iter().nth(0).ok_or("No Bluetooth adapter found")?;

        central.start_scan(ScanFilter::default()).await.map_err(|e| e.to_string())?;
        time::sleep(Duration::from_secs(2)).await;

        for peripheral in central.peripherals().await.map_err(|e| e.to_string())? {
            let properties = peripheral.properties().await.map_err(|e| e.to_string())?;
            if let Some(prop) = properties {
                println!("Discovered: {:?}", prop.local_name);
            }
        }
        
        Ok(())
    }
}

#[tauri::command]
pub async fn start_scan() -> Result<String, String> {
    println!("Starting Bluetooth scan...");
    
    // In a real app, we'd spawn this off or manage state persistently.
    // For this step, we just run a quick scan to verify dependencies.
    match BluetoothManager::start_scan().await {
        Ok(_) => Ok("Scan completed successfully".to_string()),
        Err(e) => Err(format!("Scan failed: {}", e)),
    }
}
