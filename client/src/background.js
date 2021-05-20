import path from 'path';
import { app, protocol, Menu, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let win = null;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    // width: 800,
    // height: 600,
    show: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    // eslint-disable-next-line no-undef
    icon: `${__static}/favicon.ico`,
    // hide menu bar
    autoHideMenuBar: true,
  });

  // remove menu bar
  // win.removeMenu();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// custom menu
const template = [
  {
    label: 'Refresh',
    accelerator: 'F5',
    click() {
      win.webContents.reload()
    }
  },
  {
    label: 'Screen',
    submenu: [
      {
        label: 'Zoom In',
        accelerator: 'CommandOrControl+Shift+=',
        click() {
          if (win.webContents.zoomFactor >= 3) return
          const scaleFactor = win.webContents.zoomFactor
            + 0.2
          win.webContents.setZoomFactor(+scaleFactor.toFixed(1));
          if (win.webContents.zoomFactor !== 1) {
            win.setTitle(`BookMate-${Math.round(win.webContents.zoomFactor * 100)}%`)
          } else {
            win.setTitle('BookMate')
          }
        }
      },
      {
        label: 'Zoom Out',
        accelerator: 'CommandOrControl+Shift+-',
        click() {
          if (win.webContents.zoomFactor <= 0.6) return
          const scaleFactor = win.webContents.zoomFactor - 0.2
          win.webContents.setZoomFactor(+scaleFactor.toFixed(1));
          if (win.webContents.zoomFactor !== 1) {
            win.setTitle(`BookMate-${Math.round(win.webContents.zoomFactor * 100)}%`)
          } else {
            win.setTitle('BookMate')
          }
        }
      },
      {
        label: 'Rest Zoom',
        accelerator: 'CommandOrControl+0',
        click() {
          win.webContents.setZoomLevel(0);
          if (win.webContents.zoomLevel === 0) {
            win.setTitle('BookMate')
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Full Screen',
        accelerator: 'F11',
        click() {
          win.setFullScreen(!win.fullScreen)
        }
      }
    ]
  },
  {
    label: 'DevTools',
    accelerator: 'F12',
    click() {
      win.webContents.toggleDevTools()
    }
  }
]

const applicationMenu = Menu.buildFromTemplate(template);

// custom protocol
function setDefaultProtocol() {
  const agreement = 'bookmate' // 自定义协议名
  let isSet = false // 是否注册成功

  app.removeAsDefaultProtocolClient(agreement) // 每次运行都删除自定义协议 然后再重新注册
  console.log(process.env.NODE_ENV)
  console.log(process.platform);
  console.log(process.execPath);
  // 开发模式下在window运行需要做兼容
  // if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
  //   // 设置electron.exe 和 app的路径
  //   isSet = app.setAsDefaultProtocolClient(agreement, process.execPath, [
  //     path.resolve(process.argv[1]),
  //   ])
  // } else {
  //   isSet = app.setAsDefaultProtocolClient(agreement)
  // }
  console.log('是否注册成功', isSet)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  setDefaultProtocol();

  createWindow();

  Menu.setApplicationMenu(applicationMenu)

  win.once('ready-to-show', () => {
    win.show()
    if (win.webContents.zoomFactor !== 1.0) {
      win.setTitle(`BookMate-${Math.round(win.webContents.zoomFactor * 100)}%`)
    }
  })

});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
