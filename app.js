const { app, BrowserWindow } = require('electron')

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
})

app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);