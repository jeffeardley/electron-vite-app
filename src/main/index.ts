import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as isDev from 'electron-is-dev'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Load the Vite dev server URL in development
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Enable HMR for development
  if (isDev) {
    mainWindow.webContents.on('did-fail-load', () => {
      console.log('Page failed to load, retrying...')
      mainWindow?.loadURL('http://localhost:5173')
    })
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Handle HMR
if (isDev) {
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true
    })
  } catch (_) { console.log('Error with electron-reloader') }
}