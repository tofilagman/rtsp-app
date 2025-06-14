const { ipcMain, app, BrowserWindow, Menu } = require('electron/main');
const path = require('node:path')
const Store = require('electron-store').default;
const server = require('./server');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

const schema = {
  IPADDRESS: {
    type: 'string',
    default: '192.168.254.200'
  },
  PORT: {
    type: 'number',
    default: 554
  },
  USER: {
    type: 'string',
    default: 'live'
  },
  PASSWORD: {
    type: 'string',
    default: 'dev123456'
  },
  FFMPEG: {
    type: 'string',
    default: 'C:\\dev\\ffmpeg\\bin\\ffmpeg.exe'
  }
};

const store = new Store({ schema });

ipcMain.handle('get-value', async (event, key) => {
  return store.get(key)
})

ipcMain.handle('set-value', async (event, key, value) => {
  store.set(key, value)
  return true
})

ipcMain.handle('camera-change', async (event, value) => {
  console.log(value)
   startServer(value);
})


const menuOpt = [
  {
    label: 'Preference',
    submenu: [
      {
        label: 'Settings',
        click: () => createSettingWindow()
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
]

const menu = Menu.buildFromTemplate(menuOpt);
Menu.setApplicationMenu(menu);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      nodeIntegration: true,
      webSecurity: false
    },
    simpleFullscreen: true
  })

  // store.onDidAnyChange(x => {
  //   startServer();
  // });

  //startServer();

  win.loadFile(path.join('src', 'index2.html'))
}

function createSettingWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'setting.js'),
      nodeIntegration: true,
      webSecurity: false
    }
  })

  win.loadFile(path.join('src', 'setting.html'))
}

function startServer(item) {
  server.init({
    FFMPEG: store.get('FFMPEG'),
    USER: store.get('USER'),
    PASSWORD: store.get('PASSWORD'),
    IPADDRESS: store.get('IPADDRESS'),
    PORT: store.get('PORT')
  });
  server.start(item);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})