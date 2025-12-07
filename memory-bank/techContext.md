# Tech Context

## Technology Stack

### PC Client ("Aura Link")

- **Framework**: **Tauri 2.0** (Rust Backend + Webview Frontend).
- **Frontend**: React, TypeScript, Vite.
- **Styling**: TailwindCSS (v3.4+).
- **State Management**: React Context / Hooks.
- **Inter-Process Communication (IPC)**: Tauri Commands (Invoke/Event system).
- **Bluetooth/System**: Rust crates (`btleplug` or similar) handled in the Core Process.
- **Formatting**: Prettier, ESLint.

## Development Constraints

- **OS**: Linux (Development), Windows/macOS (Target).
- **Performance**: Minimize heavy JS bundles. Offload logic to Rust where possible.
- **Security**: Follow Tauri security guidelines (Capabilities, Scope).

## Communication Protocol

- **Native Modules**: Bluetooth libraries in Node.js often require native compilation (`node-gyp`). We must ensure the correct headers are downloaded for the Electron version used.
- **IPC**: Bluetooth logic runs in the **Main Process** (Node.js), while UI runs in **Renderer Process**. They must communicate via `ipcMain` and `ipcRenderer` (Context Bridge).
