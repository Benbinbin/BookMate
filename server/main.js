// Modules to control application life and create native browser window
const path = require('path');
const fs = require('fs')
const { app, shell, Menu, Tray, crashReporter } = require('electron')

// reference: https://github.com/electron-in-action/electron-crash-report-server-fem-v2/blob/master/server.js
// crash and uncaught exception error log
let errorLogStream = null
function setLog() {
  // crashes log
  app.setPath('crashDumps', path.join(app.getAppPath(), 'logs/crashes'))
  crashReporter.start({
    submitURL: '',
    uploadToServer: false
  })

  // uncaught exception log
  app.setAppLogsPath(app.getAppPath() + '/logs')
  //Create error log Stream
  errorLogStream = fs.createWriteStream(path.join(app.getPath('logs'), 'error.log'), { flags: 'a' })

  //Error handling, avoiding crash
  process.on('uncaughtException', function (err) {
    const date = new Date();
    console.error(err);
    errorLogStream.write(date + '\n' + err.stack + '\n\n');
  });
}

const server = require(`${__dirname}/bin/www`)

// let mainWindow = null;

// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     // show: false
//   });
// })

let tray = null
app.whenReady().then(() => {
  setLog()

  tray = new Tray(`${__dirname}/public/logos/server.ico`)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open BookMate Client',
      click: () => {
        shell.openExternal('bookmate://');
      }
    },
    {
      label: 'Open Log In Folder',
      click: () => {
        shell.openPath(app.getPath('logs'))
      }
    },
    {
      label: 'Restart BookMate Server',
      click() {
        app.relaunch()
      }
    },
    {
      label: 'Close BookMate Server',
      click: () => {
        app.exit()
      }
    },
    // {
    //   label: 'Test Crash',
    //   click: () => {
    //     process.crash()
    //   }
    // }
  ])
  tray.setToolTip('BookMate Server');
  tray.setContextMenu(contextMenu);
  shell.openExternal('bookmate://');
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
