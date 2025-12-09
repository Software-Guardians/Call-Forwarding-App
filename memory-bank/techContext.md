# Tech Context

## Technology Stack

### PC Client ("Aura Link")

- **Framework**: **Tauri 2.0** (Rust Backend + Webview Frontend).
- **Frontend**: React, TypeScript, Vite.
- **Styling**: TailwindCSS (v3.4+).
  - **Theming**: CSS Variables (RGB format) defined in `App.css` layer base to support multi-theme switching (e.g., `rgb(var(--color-primary) / 0.5)`).
- **State Management**: React Context / Hooks.
- **Inter-Process Communication (IPC)**: Tauri Commands (Invoke/Event system).
- **Bluetooth/System**: Rust crates (`btleplug` or similar) handled in the Core Process.
- **Formatting**: Prettier, ESLint.

## Development Constraints

- **OS**: Linux (Development), Windows/macOS (Target).
- **Performance**: Minimize heavy JS bundles. Offload logic to Rust where possible.
- **Security**: Follow Tauri security guidelines (Capabilities, Scope).

## Communication Protocol

- **Native Modules**: Rust handles all native system interactions (Bluetooth, Audio, File System) directly. No `node-gyp` or native Node modules required.
- **IPC**: Communication flows between the **Rust Core** and **WebView** via Tauri's `invoke` (Frontend -> Backend) and `emit` (Backend -> Frontend) system.
