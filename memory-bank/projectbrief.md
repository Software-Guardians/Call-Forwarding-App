# Project Brief: Call Forwarding Application (PC Client)

## Overview

The Call Forwarding Application is a system that bridges an Android device and a PC. The PC Client ("Aura Link") is a desktop application built with **Tauri** (Rust + React) that enables users to manage phone calls, view notifications, and route audio through their computer.

## Core Goals

1. **Connectivity**: Establish a stable Bluetooth RFCOMM connection between Android and PC.

- **PC Client**:
  - **Technology**: **Tauri** (Rust + React).
  - **Role**: Dashboard for dialing, audio routing, and contact management.
  - **Connection**: Connects to the host phone via Bluetooth (HFP/PBAP).
  - **Design**: "Aura Theme" - Cyberpunk/Sci-Fi aesthetic (Dark mode, Neon, Glassmorphism).

2. **Call Control**: Allow answering, rejecting, and ending calls from the PC.
3. **Audio Routing**: Leverage the PC's audio hardware.
4. **UI/UX**: Provide a premium "Cyberpunk" interface using modern Web Technologies (HTML/CSS/React).

## Scope

- **Platform**: Windows (Primary), Linux.
- **Technology**: **Tauri**, **React**, **Rust**.
- **Protocol**: Custom JSON-based protocol over Bluetooth SPP.
