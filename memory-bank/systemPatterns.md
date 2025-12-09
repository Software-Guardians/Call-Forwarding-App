# System Patterns

## System Architecture (PC Client - Tauri)

### 1. Core Process (Rust)

- **Role**: System-level operations (Bluetooth SCO, File System, Tray, Global Hotkeys).
- **Performance**: High-performance, low-memory footprint.
- **Communication**: Exposes `commands` to the Frontend via Tauri IPC.

### 2. Frontend (WebView)

- **Role**: UI Rendering, User Interaction, State Management.
- **Tech**: React + Vite + TailwindCSS.
- **Isolation**: Runs in a sandboxed webview. No direct Node.js access.

### 3. IPC (Inter-Process Communication)

- **Pattern**: Asynchronous Message Passing.
- **Frontend**: `invoke('command_name', { args })`.
- **Backend**: `#[tauri::command] fn command_name()`.

## Technical Decisions

1. **Architecture**: **IPC-First**. The UI is purely a "view". All business logic handles in Rust.
2. **Transport**: `btleplug` (or native BlueZ via dbus) running in Rust.
3. **Logs**: Handled by Rust `println!` (stdout) or `log` crate.
4. **Security**: Tauri default isolation pattern.

## Audio Routing Strategy

- **Library**: `cpal` (Rust Audio Library).
- **Strategy**:
    1. **Enumeration**: List available input/output devices.
    2. **Bluetooth SCO**: OS naturally handles HFP routing.
    3. **Routing**: Application relies on PulseAudio/PipeWire default routing.
    4. **Privacy**: Microphone access requested only when needed.

## Command Protocol Definition

The communication between Android and PC uses **JSON Lines** over RFCOMM.

### Base Structure

```json
{
  "type": "MESSAGE_TYPE",
  "payload": { ... }
}
```

### Message Types

1. **CALL_STATE** (Android -> PC): Updates status (IDLE, RINGING, ACTIVE).

   ```json
   { "type": "CALL_STATE", "payload": { "state": "RINGING", "number": "+123456" } }
   ```

2. **COMMAND** (PC -> Android): Controls call (ANSWER, REJECT, END, DIAL).

   ```json
   { "type": "COMMAND", "payload": { "action": "ANSWER" } }
   ```

3. **HEARTBEAT** (Bidirectional): Keep-alive.

   ```json
   { "type": "HEARTBEAT", "payload": {} }
   ```

## IPC Commands

- `greet`: Test command.
- `log_message`: Logging helper.
- `bluetooth::start_scan`: Initiates BLE scan.

## Design Patterns

- **Service Module**: `bluetooth` module encapsulates scanning and socket logic.
- **Event Driven**: Backend emits events (e.g., `scan-result`) to Frontend.
