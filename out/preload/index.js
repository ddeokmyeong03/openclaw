"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  showSaveDialog: () => electron.ipcRenderer.invoke("show-save-dialog"),
  exportCard: (dataUrl, filePath) => electron.ipcRenderer.invoke("export-card", dataUrl, filePath)
});
