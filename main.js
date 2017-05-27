const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname);

let win = null;

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
});

if (shouldQuit) {
  alert('3');
  app.quit();
}


app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('browser-window-created', function (e, window) {
  window.setMenu(null);
});

app.on('ready', function () {

  const { screen } = require('electron');
  let display = screen.getPrimaryDisplay();

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    minWidth: 900,
    minHeight: 600,
    maxWidth: display.size.width,
    maxHeight: display.size.height
  });

  win.webContents.openDevTools();

  // Specify entry point
  if (process.env.PACKAGE === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'packed/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
  }

  // Remove window once app is closed
  win.on('closed', function () {

    win = null;

  });


});