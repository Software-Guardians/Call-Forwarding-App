// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod audio_manager;
mod bluetooth;
mod protocol;

#[tauri::command]
fn log_message(msg: &str) {
    println!("Frontend says: {}", msg);
}

use tauri::menu::{Menu, MenuItem};
use tauri::tray::{TrayIconBuilder, TrayIconEvent};
use tauri::Manager;
use tauri_plugin_global_shortcut::GlobalShortcutExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Log audio devices on startup
    if let Ok(devices) = audio_manager::AudioManager::list_audio_devices() {
        println!("Available Audio Devices:");
        for dev in devices {
            println!("  - {}", dev);
        }
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(move |app, shortcut, event| {
                    #[cfg(desktop)]
                    {
                        use tauri_plugin_global_shortcut::{Code, Modifiers, ShortcutState};
                        let ctrl_alt_s = tauri_plugin_global_shortcut::Shortcut::new(
                            Some(Modifiers::CONTROL | Modifiers::ALT),
                            Code::KeyS,
                        );
                        if shortcut == &ctrl_alt_s {
                            match event.state() {
                                ShortcutState::Pressed => {
                                    if let Some(window) = app.get_webview_window("main") {
                                        if window.is_visible().unwrap_or(false) {
                                            let _ = window.hide();
                                        } else {
                                            let _ = window.show();
                                            let _ = window.set_focus();
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                })
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            greet,
            log_message,
            bluetooth::start_scan,
            bluetooth::send_command,
            bluetooth::connect_device,
            bluetooth::disconnect_device
        ])
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_global_shortcut::{Code, Modifiers};
                let ctrl_alt_s = tauri_plugin_global_shortcut::Shortcut::new(
                    Some(Modifiers::CONTROL | Modifiers::ALT),
                    Code::KeyS,
                );
                app.global_shortcut().register(ctrl_alt_s)?;
            }

            // Register Bluetooth Global State
            app.manage(bluetooth::BluetoothAppState::default());

            // Auto-Start Bluetooth Server
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                if let Err(e) = bluetooth::BluetoothManager::start_server(app_handle).await {
                    println!("CRITICAL: Failed to start Bluetooth Server: {}", e);
                }
            });

            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let show_i = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

            let _tray = TrayIconBuilder::with_id("tray")
                .menu(&menu)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| match event {
                    TrayIconEvent::Click { .. } => {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                let _ = window.hide();
                api.prevent_close();
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
