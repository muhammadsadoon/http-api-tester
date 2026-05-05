// electron/preload.cjs  ← .cjs extension zaroor
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getUsers: () => ipcRenderer.invoke('get-users'),
})