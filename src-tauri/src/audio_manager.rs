use cpal::traits::{DeviceTrait, HostTrait};

pub struct AudioManager;

impl AudioManager {
    pub fn list_audio_devices() -> Result<Vec<String>, String> {
        let host = cpal::default_host();
        let mut devices = Vec::new();

        match host.output_devices() {
            Ok(devs) => {
                for dev in devs {
                    if let Ok(name) = dev.name() {
                        devices.push(format!("Output: {}", name));
                    }
                }
            }
            Err(e) => return Err(format!("Failed to get output devices: {}", e)),
        }

        match host.input_devices() {
            Ok(devs) => {
                for dev in devs {
                    if let Ok(name) = dev.name() {
                        devices.push(format!("Input: {}", name));
                    }
                }
            }
            Err(e) => return Err(format!("Failed to get input devices: {}", e)),
        }

        Ok(devices)
    }
}
