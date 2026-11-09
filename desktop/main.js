'use strict';

const { app, BrowserWindow, Menu, Tray, ipcMain, dialog, shell, nativeImage } = require('electron');
const { autoUpdater } = require('electron-updater');
const Store = require('electron-store');
const path = require('path');
const fs = require('fs');

const store = new Store();
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const APP_URL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`;

let mainWindow = null;
let splashWindow = null;
let tray = null;
let aboutWindow = null;

// ─── Window State ────────────────────────────────────────────────────────────
function getWindowState() {
  return store.get('windowState', {
    width: 1400,
    height: 900,
    x: undefined,
    y: undefined,
    isMaximized: false,
  });
}

function saveWindowState(win) {
  if (!win || win.isDestroyed()) return;
  const bounds = win.getBounds();
  store.set('windowState', {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized: win.isMaximized(),
  });
}

// ─── Splash Screen ───────────────────────────────────────────────────────────
function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 480,
    height: 320,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    center: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const splashHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 480px; height: 320px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-family: 'Segoe UI', Arial, sans-serif;
    border-radius: 12px;
    overflow: hidden;
    color: #ffffff;
  }
  .logo { font-size: 48px; margin-bottom: 12px; }
  h1 { font-size: 32px; font-weight: 700; color: #e94560; letter-spacing: 2px; }
  p { font-size: 14px; color: #a0a0b0; margin-top: 6px; }
  .bar-wrap { width: 280px; height: 4px; background: #2a2a4a; border-radius: 4px; margin-top: 32px; overflow: hidden; }
  .bar { height: 100%; width: 0%; background: linear-gradient(90deg, #e94560, #0f3460); border-radius: 4px; animation: load 2s ease forwards; }
  @keyframes load { to { width: 100%; } }
  .credit { position: absolute; bottom: 18px; font-size: 11px; color: #606080; }
</style>
</head>
<body>
  <div class="logo">🏍️</div>
  <h1>Bike Lover</h1>
  <p>Motorcycle Dealership Management System</p>
  <div class="bar-wrap"><div class="bar"></div></div>
  <div class="credit">WebCraftersPro &bull; Loading…</div>
</body>
</html>`;

  const tmpPath = path.join(app.getPath('temp'), 'bike-lover-splash.html');
  fs.writeFileSync(tmpPath, splashHtml, 'utf8');
  splashWindow.loadFile(tmpPath);
}

// ─── Main Window ─────────────────────────────────────────────────────────────
function createMainWindow() {
  const state = getWindowState();

  mainWindow = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 1200,
    minHeight: 700,
    show: false,
    title: 'Bike Lover – Motorcycle Dealership Management',
    icon: getAppIcon(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: !isDev,
    },
  });

  if (state.isMaximized) mainWindow.maximize();

  mainWindow.loadURL(APP_URL);

  mainWindow.once('ready-to-show', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      setTimeout(() => {
        splashWindow.close();
        splashWindow = null;
        mainWindow.show();
        mainWindow.focus();
        if (!isDev) autoUpdater.checkForUpdatesAndNotify();
      }, 2200);
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('close', (e) => {
    saveWindowState(mainWindow);
    if (tray) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  ['resize', 'move'].forEach((ev) => mainWindow.on(ev, () => saveWindowState(mainWindow)));

  buildMenu();
}

// ─── App Icon Helper ─────────────────────────────────────────────────────────
function getAppIcon() {
  const candidates = [
    path.join(__dirname, 'assets', 'icon.ico'),
    path.join(__dirname, 'assets', 'icon.png'),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return undefined;
}

// ─── Tray ────────────────────────────────────────────────────────────────────
function createTray() {
  const iconPath = getAppIcon();
  if (!iconPath) return;

  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  tray.setToolTip('Bike Lover');

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show Bike Lover',
      click: () => {
        if (mainWindow) { mainWindow.show(); mainWindow.focus(); }
      },
    },
    { type: 'separator' },
    { label: 'New Sale', click: () => navigateTo('/sales/new') },
    { label: 'New Purchase', click: () => navigateTo('/purchases/new') },
    { label: 'Add Bike', click: () => navigateTo('/bikes/add') },
    { type: 'separator' },
    { label: 'Quit Bike Lover', click: () => { tray = null; app.quit(); } },
  ]);

  tray.setContextMenu(trayMenu);
  tray.on('double-click', () => {
    if (mainWindow) { mainWindow.show(); mainWindow.focus(); }
  });
}

function navigateTo(route) {
  if (!mainWindow) return;
  mainWindow.show();
  mainWindow.focus();
  mainWindow.webContents.executeJavaScript(`window.location.hash = '${route}'`);
}

// ─── Application Menu ─────────────────────────────────────────────────────────
function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Sale',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => navigateTo('/sales/new'),
        },
        {
          label: 'New Purchase',
          accelerator: 'CmdOrCtrl+Shift+P',
          click: () => navigateTo('/purchases/new'),
        },
        {
          label: 'Add Bike',
          accelerator: 'CmdOrCtrl+Shift+B',
          click: () => navigateTo('/bikes/add'),
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Alt+F4',
          click: () => { tray = null; app.quit(); },
        },
      ],
    },
    {
      label: 'Reports',
      submenu: [
        {
          label: 'Daily Report',
          accelerator: 'CmdOrCtrl+1',
          click: () => navigateTo('/reports/daily'),
        },
        {
          label: 'Monthly Report',
          accelerator: 'CmdOrCtrl+2',
          click: () => navigateTo('/reports/monthly'),
        },
        {
          label: 'Yearly Report',
          accelerator: 'CmdOrCtrl+3',
          click: () => navigateTo('/reports/yearly'),
        },
        { type: 'separator' },
        {
          label: 'Export Data',
          accelerator: 'CmdOrCtrl+E',
          click: () => navigateTo('/reports/export'),
        },
      ],
    },
    {
      label: 'Settings',
      click: () => navigateTo('/settings'),
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Bike Lover',
          click: () => showAboutWindow(),
        },
        { type: 'separator' },
        {
          label: 'WebCraftersPro Website',
          click: () => shell.openExternal('https://www.webcrafterspro.com'),
        },
        {
          label: 'Check for Updates',
          click: () => autoUpdater.checkForUpdatesAndNotify(),
        },
      ],
    },
  ];

  if (isDev) {
    template.push({
      label: 'Developer',
      submenu: [
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => mainWindow && mainWindow.reload() },
        { label: 'Toggle DevTools', accelerator: 'F12', click: () => mainWindow && mainWindow.webContents.toggleDevTools() },
        { type: 'separator' },
        { label: 'Force Reload', accelerator: 'CmdOrCtrl+Shift+R', click: () => mainWindow && mainWindow.webContents.reloadIgnoringCache() },
      ],
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ─── About Window ─────────────────────────────────────────────────────────────
function showAboutWindow() {
  if (aboutWindow && !aboutWindow.isDestroyed()) {
    aboutWindow.focus();
    return;
  }

  aboutWindow = new BrowserWindow({
    width: 420,
    height: 360,
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: mainWindow,
    modal: true,
    title: 'About Bike Lover',
    icon: getAppIcon(),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const aboutHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #1a1a2e; color: #ffffff;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100vh; padding: 32px; text-align: center;
  }
  .logo { font-size: 56px; margin-bottom: 12px; }
  h1 { font-size: 26px; font-weight: 700; color: #e94560; }
  .version { font-size: 13px; color: #a0a0b0; margin-top: 4px; }
  .desc { font-size: 14px; color: #c0c0d0; margin-top: 16px; line-height: 1.6; }
  .divider { width: 80%; height: 1px; background: #2a2a4a; margin: 20px auto; }
  .credit { font-size: 13px; color: #a0a0b0; }
  a { color: #e94560; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .address { font-size: 12px; color: #606080; margin-top: 8px; }
  button {
    margin-top: 24px; padding: 10px 28px;
    background: #e94560; color: white; border: none;
    border-radius: 6px; font-size: 14px; cursor: pointer;
  }
  button:hover { background: #c73350; }
</style>
</head>
<body>
  <div class="logo">🏍️</div>
  <h1>Bike Lover</h1>
  <div class="version">v1.0.0</div>
  <p class="desc">Motorcycle Dealership Management System<br>Complete solution for bike sales, purchases & inventory.</p>
  <div class="divider"></div>
  <div class="credit">Designed &amp; Developed By<br><strong>WebCraftersPro</strong><br><a href="https://www.webcrafterspro.com" onclick="require('electron').shell.openExternal('https://www.webcrafterspro.com')">https://www.webcrafterspro.com</a></div>
  <div class="address">Japani Bazar, Sonir Akhra, Dhaka, Bangladesh</div>
  <button onclick="window.close()">Close</button>
</body>
</html>`;

  const tmpPath = path.join(app.getPath('temp'), 'bike-lover-about.html');
  fs.writeFileSync(tmpPath, aboutHtml, 'utf8');
  aboutWindow.loadFile(tmpPath);
  aboutWindow.setMenu(null);
  aboutWindow.on('closed', () => { aboutWindow = null; });
}

// ─── IPC Handlers ─────────────────────────────────────────────────────────────
ipcMain.handle('print-invoice', async (event, transactionId) => {
  if (!mainWindow) return { success: false, error: 'No main window' };
  return new Promise((resolve) => {
    mainWindow.webContents.print(
      {
        silent: false,
        printBackground: true,
        deviceName: '',
        margins: { marginType: 'custom', top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 },
      },
      (success, failureReason) => {
        if (success) resolve({ success: true });
        else resolve({ success: false, error: failureReason });
      }
    );
  });
});

ipcMain.handle('save-pdf', async (event, { filename }) => {
  if (!mainWindow) return { success: false, error: 'No main window' };

  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    defaultPath: filename || 'invoice.pdf',
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    title: 'Save Invoice as PDF',
  });

  if (canceled || !filePath) return { success: false, error: 'Cancelled' };

  try {
    const pdfData = await mainWindow.webContents.printToPDF({
      marginsType: 1,
      printBackground: true,
      pageSize: 'A4',
      landscape: false,
    });
    fs.writeFileSync(filePath, pdfData);
    return { success: true, filePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('open-external-link', async (event, url) => {
  if (!url || typeof url !== 'string') return { success: false };
  const allowed = ['https://', 'http://'];
  if (!allowed.some((prefix) => url.startsWith(prefix))) return { success: false, error: 'Unsafe URL' };
  await shell.openExternal(url);
  return { success: true };
});

ipcMain.handle('get-app-version', () => app.getVersion());

// ─── Auto-Updater ─────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', (info) => {
    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: 'Update Available',
        message: `Bike Lover v${info.version} is available. Download now?`,
        buttons: ['Download', 'Later'],
        defaultId: 0,
      })
      .then(({ response }) => {
        if (response === 0) autoUpdater.downloadUpdate();
      });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: 'Update Ready',
        message: 'Update downloaded. Bike Lover will restart to apply the update.',
        buttons: ['Restart Now', 'Later'],
        defaultId: 0,
      })
      .then(({ response }) => {
        if (response === 0) autoUpdater.quitAndInstall();
      });
  });

  autoUpdater.on('error', (err) => {
    console.error('AutoUpdater error:', err.message);
  });
}

// ─── App Lifecycle ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createSplashWindow();
  createMainWindow();
  createTray();
  setupAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    else if (mainWindow) mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (mainWindow && !mainWindow.isDestroyed()) saveWindowState(mainWindow);
  tray = null;
});

// Prevent multiple instances
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}
