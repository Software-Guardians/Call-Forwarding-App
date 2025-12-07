# Active Context

## Current Focus

We are migrating the entire infrastructure from Electron to **Tauri**.
The previous Electron codebase has been deleted. We are starting fresh with a Rust-based backend and React frontend.

## Recent Changes

- **Hard Reset**: Deleted all Electron-related files, git history, and node_modules.
- **Retention**: Kept only `UI-Template`, `AGENTS.md`, and `memory-bank`.
- **Decision**: Switch to Tauri for better performance, smaller bundle size, and security.

## Active Status

- [x] Cleanup Electron files
- [ ] Update Memory Bank
- [ ] Initialize Tauri Project (`npm create tauri-app`)
- [ ] Re-implement `Dialer` component using the Template

## Next Steps

1. Initialize Tauri Project.
2. Port **Main Dashboard** (`main_dashboard_2`) as the layout shell.
3. Port **Dialer** (`dialer_screen_2`).
4. Port **Contacts** (`contacts_screen_2`).
5. Port remaining screens (`active_call`, `incoming_call`, `settings`).

- **GIT RULE**: Always use `git push origin master` when pushing changes.
- **Phase 1 Step 1 Completed**: Implemented "Aura Theme" in Tailwind (configured colors, fonts, shadows from UI-Template). Fixed PostCSS build.
- **CRITICAL**: Pivoted stack from Python to **Electron**.
- Removed old Python files (`src/`, etc.).

## Next Steps

- Run `npm init` and install dependencies.
- Configure Vite for Electron.

## Active Decisions

- **Tech Stack**: Electron was chosen for better UI capabilities (CSS/HTML) and "Cyberpunk" styling potential.
- **Architecture**: Logic in Main Process, UI in Renderer. IPC for communication.
- **Strict Progress Logging**: Rule remains active.
- **Verify & Commit**: Rule remains active.
