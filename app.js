/* const { app, BrowserWindow } = require('electron')

let win;

function CreateWindow() {
    win = new BrowserWindow({ show: false, autoHideMenuBar: true });
    win.maximize();
    win.show();

    win.loadFile('dist/dental-office-fe/browser/index.html');

    win.on('closed', function () {
        win = null
    })
}

app.whenReady().then(() => {
    CreateWindow()
}) */

const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/dental-office-fe/browser/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})