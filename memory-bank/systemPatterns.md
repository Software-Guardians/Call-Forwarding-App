# System Patterns

## System Architecture

The system uses **Electron's Main/Renderer Architecture**.

```mermaid
graph TD
    subgraph "Main Process (Node.js)"
        Main[Main.ts] -- Controls --> AppWindow[BrowserWindow]
        Main -- Uses --> BTManager[Bluetooth Manager]
        BTManager -- RFCOMM --> AndroidDevice
    end

## System Architecture (PC Client - Tauri)

### 1. Core Process (Rust)
-   **Role**: System-level operations (Bluetooth, File System, Tray, Global Hotkeys).
-   **Performance**: High-performance, low-memory footprint.
-   **Communication**: Exposes `commands` to the Frontend via Tauri IPC.

### 2. Frontend (WebView)
-   **Role**: UI Rendering, User Interaction, State Management.
-   **Tech**: React + Vite + TailwindCSS.
-   **Isolation**: Runs in a sandboxed webview. No direct Node.js access (unlike Electron). Accesses system features ONLY via invoke/events.

### 3. IPC (Inter-Process Communication)
-   **Pattern**: Asynchronous Message Passing.
-   **Frontend**: `invoke('command_name', { args })`.
-   **Backend**: `#[tauri::command] fn command_name()`.

## Technical Decisions

1. **Architecture**: **IPC-First**. The UI is purely a "view". All business logic (connecting, parsing messages) happens in the Main Process to avoid freezing the UI.
2. **Transport**: `bluetooth-serial-port` running in Main.
3. **Logs**: Stored in AppData via `electron-log`. Displayed in UI by streaming log lines over IPC.
4. **Security**: `contextIsolation: true`, `nodeIntegration: false`.

## Audio Routing Strategy
- **Library**: `cpal` (Rust Audio Library).
- **Strategy**:
    1. **Enumeration**: List available input/output devices using `cpal`.
    2. **Bluetooth SCO**: When a call is active, specific input/output devices (Bluetooth Hands-Free) appear in the OS.
    3. **Routing**: The application will not manually stream audio bytes unless necessary. Modern Linux systems (PulseAudio/PipeWire) automatically route call audio to the default communication device.
    4. **Fallback**: If manual routing is needed, we will open a stream from the Default Input -> Bluetooth Output and Bluetooth Input -> Default Output.
    5. **Privacy**: Microphone access is only requested during active calls.

## IPC Commands
- `greet`: Test command.
- `log_message`: Logging helper.
- `bluetooth::start_scan`: Initiates BLE scan.

## Design Patterns

- **Repository/Service Pattern**: `BluetoothService` in Main Process handles the socket.
- **Pub/Sub**: Renderer subscribes to `call-status` channel.
