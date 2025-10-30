import { app, BrowserWindow, session } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development';


async function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      webviewTag: true,
    },
  });

  // Load the app
  if (isDev) {
    // Development: Use webpack dev server
    try {
      await mainWindow.loadURL('http://localhost:3000');
      // Open the DevTools in development mode
      mainWindow.webContents.openDevTools();
    } catch (error) {
      console.error('Failed to load dev server:', error);
      app.quit();
    }
  } else {
    // Production: Load the built files
    try {
      const indexPath = path.join(__dirname, '../renderer/index.html');
      console.log('Loading production file from:', indexPath);
      await mainWindow.loadFile(indexPath);
      console.log('Production file loaded successfully');
    } catch (error) {
      console.error('Failed to load production build:', error);
      // Try alternative path
      try {
        const altPath = path.join(__dirname, '../../dist/renderer/index.html');
        console.log('Trying alternative path:', altPath);
        await mainWindow.loadFile(altPath);
        console.log('Alternative path loaded successfully');
      } catch (err) {
        console.error('Failed to load from alternative path:', err);
        app.quit();
      }
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
