
const { contextBridge, ipcRenderer } = require('electron')

/* version info */
for (const dependency of ['chrome', 'node', 'electron']) {
  console.log(`${dependency}-version`, process.versions[dependency])
}

/* main process API */
contextBridge.exposeInMainWorld('electron', {
  savePNG: (data) => ipcRenderer.send('save-as-png', data)
})