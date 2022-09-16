
  for (const dependency of ['chrome', 'node', 'electron']) {
    console.log(`${dependency}-version`, process.versions[dependency])
  }

  const { contextBridge, ipcRenderer } = require('electron')

  contextBridge.exposeInMainWorld('electron', {
      savePNG: (data) => ipcRenderer.send('save-as-png', data)
  })