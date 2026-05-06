import { app, BrowserWindow, Menu, shell } from 'electron'
import path from 'path'

const appPath = app.getAppPath()
const isDev: boolean = process.env.NODE_ENV === 'development'

let aboutWindow: BrowserWindow | null = null

function createAboutWindow() {
  if (aboutWindow) {
    aboutWindow.focus()
    return
  }
  aboutWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: 'About App',
    webPreferences: {
      preload: path.join(appPath, 'electron/preload.cjs'),
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  })

  // Load public/about.html
  aboutWindow.loadFile(path.join(appPath, isDev ? 'public/about.html' : 'out/about.html'))

  aboutWindow.on('closed', () => {
    aboutWindow = null
  })
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(appPath, 'electron/preload.cjs'),
      contextIsolation: true,
    }
  })

  const template: any = [
    {
      label: 'View',
      submenu: [
        { role: 'togglefullscreen', label: 'Full Screen' }
      ]
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'About App',
          click: () => {
            createAboutWindow()
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.webContents.setWindowOpenHandler(({ url }) => {
    // If it's a help URL, we handle it to prevent 404.
    // url might be http://localhost:3000/help/v1 or file:///.../help/v1
    if (url.includes('/help/v1')) {
      const helpWin = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true
      });
      if (isDev) {
        helpWin.loadURL('http://localhost:3000/#help');
      } else {
        helpWin.loadFile(path.join(appPath, 'out/index.html'), { hash: 'help' });
      }
      return { action: 'deny' };
    }
    
    // For external links like github.com, open in default browser
    if (url.startsWith('http') && !url.includes('localhost')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }

    return { action: 'allow' };
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