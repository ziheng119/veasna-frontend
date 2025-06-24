import { app, BrowserWindow } from 'electron';
// import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // Use this during development
  win.loadURL('http://localhost:3000');

  // For production, use this instead:
  // win.loadFile(path.join(__dirname, '../out/index.html'));
}

app.whenReady().then(createWindow);
