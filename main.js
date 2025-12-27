const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win; // Riferimento globale alla finestra

function createWindow() {
    console.log("CREAO");
  // 1. Crea la finestra del browser (le dimensioni sono configurabili)
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Importante per Electron: abilita l'uso di Node.js e moduli
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 2. Carica l'applicazione Angular dalla cartella di build
  // path.join combina correttamente i percorsi, indipendentemente dal sistema operativo
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/dentaloffice-fe/browser/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  // (Opzionale) Apri gli Strumenti per Sviluppatori per il debug
  // win.webContents.openDevTools(); 

  // Emetti quando la finestra viene chiusa
  win.on('closed', () => {
    win = null;
  });
}

// Quando Electron ha finito di inizializzarsi è pronto per creare le finestre del browser.
app.on('ready', createWindow);

// Esci quando tutte le finestre sono chiuse (tranne su macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Su macOS è comune ri-creare una finestra quando l'icona del dock è cliccata e non ci sono altre finestre aperte.
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});