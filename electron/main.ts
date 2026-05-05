import { app, BrowserWindow } from 'electron'
import path from 'path'

const appPath = app.getAppPath()
const isDev: boolean = process.env.NODE_ENV === 'development'

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(appPath, 'electron/preload.cjs'),
      contextIsolation: true,
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools() // dev mein DevTools open hoga
  } else {
    win.loadFile(path.join(appPath, 'out/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})