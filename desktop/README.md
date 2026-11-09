# Bike Lover – Desktop App

Electron-based desktop wrapper for the Bike Lover Motorcycle Dealership Management System.

## Requirements

| Dependency | Version |
|------------|---------|
| Node.js    | 20+     |
| npm        | 10+     |
| Electron   | 28+     |

## Setup

```bash
cd desktop
npm install
```

## Development

Start the React frontend first (port 3000), then launch Electron:

```bash
# Terminal 1 – frontend
cd ../frontend && npm start

# Terminal 2 – desktop
cd desktop
npm start
```

Or use the combined command:

```bash
npm run dev
```

## Building for Windows

```bash
npm run build:win
```

The installer is output to `dist/`.

## Features

- Native Windows installer (NSIS)
- System tray with quick-access menu
- Splash screen on startup
- Window state persistence (size & position)
- Native print & Save-as-PDF for invoices
- Application menu with keyboard shortcuts
- Auto-updater support
- Single-instance lock

## IPC API (available in renderer via `window.electronAPI`)

| Method | Description |
|--------|-------------|
| `printInvoice(transactionId)` | Triggers native print dialog |
| `savePdf(data, filename)` | Opens save dialog and writes PDF |
| `openExternal(url)` | Opens URL in default browser |
| `getAppVersion()` | Returns app version string |
| `platform` | OS platform string |

## Credits

Designed & Developed By **WebCraftersPro**  
https://www.webcrafterspro.com
