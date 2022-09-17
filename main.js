const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const express = require('express')
const { writeFile, existsSync, mkdirSync } = require('fs')

/* Start a server */
const server = express()
const port = 3000
server.use(express.static('public'))
server.listen(port, () => {
  console.log(`Serving "public" at http://localhost: ${port}`)
})

/*
try {
  require('electron-reloader')(module);
} catch {}
 */

/* */
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('save-as-png', saveAsPng)
  ipcMain.on('save-glb', saveAsGLB)
  checkOutputDir();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function checkOutputDir() {
  if (existsSync("./output")) return;
  mkdirSync("./output");
}

function saveAsPng(event, data) {
  console.log("saving...")
  const projName = data?.projection;
  const dataUrl = data?.dataUrl;

  // strip off the data: url prefix to get just the base64-encoded bytes
  const img_data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(img_data, "base64");
  const file = "render-" + projName + "-" + Date.now() + '.png';
  writeFile(path.join(__dirname, "output", file),
    buffer,
    function (err, result) {
      if (err) console.log('error', err);
      console.log("saved!")
    });
}

function saveAsGLB(event, data) {
  console.log("saving...")

  // strip off the data: url prefix to get just the base64-encoded bytes
  //const glb_data = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  const file = "export-" + Date.now() + '.glb';
  writeFile(path.join(__dirname, "output", file),
    buffer,
    function (err, result) {
      if (err) console.log('error', err);
      console.log("saved!")
    });
}