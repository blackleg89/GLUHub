const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut
const path = require('path');
const url = require('url');
let mainWindow;
require('electron-reload')(__dirname)
function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    globalShortcut.register('f5', function(){
        console.log('f5 pressed')
        mainWindow.reload()
    })
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', function () {

        mainWindow = null
    })
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
   
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {

    if (mainWindow === null) {
        createWindow()
    }
});

