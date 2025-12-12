# Progress & Roadmap

- **Work Log Rule**: Every action taken must be recorded in the `Specific Progress Log` section below with high detail.

## Roadmap: Problem-Centric Phases

## Roadmap (Migration to Tauri)

### Phase 1: Setup & Infrastructure (Tauri)

- [x] **Step 1**: Initialize Tauri Project (`npm create tauri-app`). Setup React + TypeScript + Vite.
- [x] **Step 2**: Install & Configure TailwindCSS (Import "Aura" theme config).
- [x] **Step 3**: Setup basic Folder Structure (`components`, `pages`, `hooks`).

### Phase 2: Core UI Components (Porting from UI-Template)

- [x] **Step 1**: **Main Dashboard**. Port `main_dashboard_2`. (Framework, Sidebar, Header).
- [x] **Step 2**: **Dialer**. Port `dialer_screen_2`. (Numpad, Input, Shine effects).
- [x] **Step 3**: **Contacts**. Port `contacts_screen_2`. (Grid layout, Search).
- [x] **Step 4**: **Active Call**. Port `active_call_screen_2`. (Timer, Controls, Waveform).
- [x] **Step 5**: **Incoming Call Overlay**. Port `incoming_call_overlay_2`. (Transparent popup).
- [x] **Step 6**: **Settings**. Port `settings_screen_2`. (Config tabs).

### Phase 3: Rust Backend Integration

- [x] **Step 1**: Setup Rust environment and `tauri.conf.json`.
- [x] **Step 2**: Implement Basic Commands (e.g., `greet`, `log`).
- [x] **Step 3**: Investigate `btleplug` or native Bluetooth libraries for Rust.

### Phase 4: System Integration

- [x] **Step 1**: Protocol Structs requirements for Rust (Serde).
- [x] **Step 2**: Implement Bluetooth Socket Reader/Writer using `protocol.rs` (Simulated Handshake).
- [x] **Step 3**: Connect Frontend to `call-state-update` event (React Hook + IncomingCallOverlay).
- [x] **Step 4**: Verify End-to-End Simulation (Connect -> Ringing -> UI Overlay).
- [x] **Phase 4 Complete**: Protocol Handshake (Simulated) is fully operational.

### Phase 5: Core Logic Implementation (Real Device Integration)

- [x] **Step 1**: Implement real Bluetooth Socket connection (RFCOMM).
- [x] **Step 2**: **Enhanced Connection UI**:
  - Implement "Scan Devices" Modal (triggered by Connect button).
  - Display list of discovered devices with **Device Type Icons** (Phone vs Other).
  - Filter devices to allow connection **ONLY to Android Phones** (based on CoD or UUID).
  - Robust **Connection State Management** (Connecting, Connected, Disconnected, Failed) with UI feedback.
  - **Refinement**: Added manual connection verification to prevent false positives and connected Header UI to real state.
  - **Correction**: Removed unsafe fallback to ensure only truly connected devices are reported as such.
  - **Enhancement**: Enabled "Connect" button while connected to allow switching devices; Modal now correctly handles re-scanning without closing.
  - **Refactor**: Implemented `BluetoothContext` for global state management, synchronizing `GlobalHeader` and `Dashboard` connection status.
  - **Enhancement**: Updated `GlobalHeader` to display the actual connected device name fetched from the backend connection event.
  - **Enhancement**: Implemented manual disconnection flow with confirmation via `GlobalHeader`.
  - **Polish**: Disabled global text selection for a more app-like experience.
- [x] **Step 3**: Replace simulated data with real socket data.
  - **Socket**: Implemented `bluer::rfcomm::Stream` connection (Channel 1 default).
  - **I/O**: Added threaded Read Loop for continuous JSON parsing and `BluetoothAppState` for thread-safe writing.
  - **Protocol**: Connected `ProtocolMessage` structs to real socket stream.
- [x] **Step 4**: Implement Call Logic based on JSON Protocol (Incoming/Active/Ended).
  - **Context**: Updated `BluetoothContext` to manage `CallState` (IDLE/RINGING/ACTIVE) and `CallInfo` globally.
  - **Refactor**: Converted `App.tsx` to drive navigation and overlay visibility purely from Bluetooth events.
  - **Commands**: Implemented `answerCall`, `rejectCall`, `endCall`, `startCall` sending JSON commands to backend.

### Phase 6: Protocol Handshake

**Problem**: Communication protocol implementation.

- [x] **Step 1**: Implement JSON Parser in Main process (Incoming stream -> Objects).
  - **Status**: Completed.
  - **Handshake**: Implemented `Handshake` message (Version "1.0") sent immediately upon connection.
  - **Heartbeat**: Added listener for `Heartbeat` messages to verify connection vitality.
  - **Protocol**: Updated `protocol.rs` with necessary structs.
- [x] **Step 2**: Handle `HEARTBEAT` and `CALL_STATE` messages.
  - **Status**: Completed.
  - **Watchdog**: Implemented a connection health monitor. Checks every 5 seconds; disconnects if idle for >15 seconds.
  - **State**: `last_activity` timestamp added to global state, reset on every message receipt.
- [x] **Step 3**: Emit IPC events (`call-incoming`, `call-ended`) to Renderer based on parsed messages.
  - **Status**: Completed.
  - **Contacts**: Added `contacts-update` event logic for `CONTACTS_DATA` protocol messages.
  - **Events**: `call-state-update` (handled in previous steps) and `contacts-update` ensure full protocol event coverage.

### Phase 7: Call Control & Shortcuts

**Problem**: Acting on calls.

- [ ] **Step 1**: Implement "Answer/Reject" IPC commands (Renderer -> Main -> Bluetooth).
- [ ] **Step 2**: Register Global Hotkeys using Tauri `global-shortcut` plugin.

### Phase 8: Real Data

**Problem**: Replacing mocks.

- [x] **Step 1**: Implement `GET_CONTACTS` flow.
- [ ] **Step 2**: Store contacts using Tauri `plugin-store` (or compatible file store).
