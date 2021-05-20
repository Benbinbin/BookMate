// Modules to control application life and create native browser window
// const { app, BrowserWindow  } = require('electron')
const { app, shell, Menu, Tray } = require('electron')


const server = require(`${__dirname}/bin/www`)

// let mainWindow = null;

// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     // show: false
//   });
// })

let tray = null
app.whenReady().then(() => {
  tray = new Tray(`${__dirname}/public/logos/server.ico`)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open BookMate Client',
      click: () => {
        shell.openExternal('bookmate://');
      }
    },
    {
      label: 'Close BookMate Server',
      click: () => {
        app.quit()
      }
    },

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
