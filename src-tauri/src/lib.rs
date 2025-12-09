// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod bluetooth;

#[tauri::command]
fn log_message(msg: &str) {
    println!("Frontend says: {}", msg);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, log_message, bluetooth::start_scan])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
