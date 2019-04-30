// require('update-electron-app')({
//   logger: require('electron-log')
// })

const path = require('path')
const fs = require('fs')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron App')

let mainWindow = null

function initialize () {
  makeSingleInstance()

  loadConfig()
  loadApps()

  function createWindow () {
    const windowOptions = {
      width: 1280,
      minWidth: 1280,
      height: 820,
      minHeight: 820,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, 'sections', '/api-demo.html'))
    // mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
    // mainWindow.setMenu(null)

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// load config
function loadConfig () {
  require(path.join(__dirname, 'main-process/config.js'))
  let tmpDir = path.join(__dirname, 'tmp')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
  Object.assign(global.sharedObject, {TMP_DIR: path.join(__dirname, 'tmp'), BASE_DIR: __dirname})
}
// Require each JS file in the main-process dir
function loadApps () {
  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach((file) => { require(file) })
}

initialize()
