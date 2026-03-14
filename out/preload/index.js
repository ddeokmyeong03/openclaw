"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // PNG 내보내기
  showSaveDialog: () => electron.ipcRenderer.invoke("show-save-dialog"),
  exportCard: (dataUrl, filePath) => electron.ipcRenderer.invoke("export-card", dataUrl, filePath),
  // 프로젝트 CRUD
  getProjects: () => electron.ipcRenderer.invoke("projects:getAll"),
  saveProject: (project) => electron.ipcRenderer.invoke("projects:save", project),
  deleteProject: (id) => electron.ipcRenderer.invoke("projects:delete", id),
  // 설정
  getSettings: () => electron.ipcRenderer.invoke("settings:get"),
  setSettings: (settings) => electron.ipcRenderer.invoke("settings:set", settings),
  // AI 카드 생성
  generatePages: (rawText) => electron.ipcRenderer.invoke("ai:generatePages", rawText)
});
