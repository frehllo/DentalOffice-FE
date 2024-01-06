const { app, BrowserWindow } = require('electron')

let appWindow

function CreateWindow() {
    appWindow = new BrowserWindow({
        width: 300,
        height: 300
    })
    appWindow.loadFile('dist/dental-office-fe/browser/index.html');

    appWindow.on('closed', function () {
        appWindow = null
    })
}

app.whenReady().then(() => {
    CreateWindow()
})