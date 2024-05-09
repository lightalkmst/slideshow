const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webSecurity: false,
      },
    })
  
    win.loadFile('client/index.html')

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    // close all for mac
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
})

require ('./server/index')