'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Print the currently loaded page as an invoice
  printInvoice: (transactionId) =>
    ipcRenderer.invoke('print-invoice', transactionId),

  // Save the current page as a PDF via a save dialog
  savePdf: (data, filename) =>
    ipcRenderer.invoke('save-pdf', { data, filename }),

  // Open a URL in the system's default browser
  openExternal: (url) =>
    ipcRenderer.invoke('open-external-link', url),

  // Get the current app version string
  getAppVersion: () =>
    ipcRenderer.invoke('get-app-version'),

  // Current OS platform (win32 | darwin | linux)
  platform: process.platform,
});
