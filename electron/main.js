const { app, BrowserWindow, session, dialog, ipcMain } = require('electron');
const path = require('path');
const serveModule = require('electron-serve');
const serve = serveModule.default || serveModule;
const StoreModule = require('electron-store');
const Store = StoreModule.default || StoreModule;

// Initialize electron-store for persistent settings
const store = new Store({
    name: 'easydist-settings',
    defaults: {
        skipCloseConfirmation: false
    }
});

const appServe = serve({ directory: path.join(__dirname, '../out') });

// Correctly detect development mode
const isDev = !app.isPackaged;

let mainWindow;
let isForceClose = false; // Flag to bypass confirmation on force close

// Single instance lock - prevent multiple windows
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    // Another instance is already running, quit this one
    app.quit();
} else {
    // This is the first instance - handle when second instance is launched
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, focus our window instead
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}

// Performance: Disable hardware acceleration if not needed (reduces GPU memory)
// Uncomment if you want to save resources:
// app.disableHardwareAcceleration();

// Performance: Enable V8 code caching for faster startup
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=512');

// IPC handlers for settings
ipcMain.handle('get-skip-close-confirmation', () => {
    return store.get('skipCloseConfirmation');
});

ipcMain.handle('set-skip-close-confirmation', (event, value) => {
    store.set('skipCloseConfirmation', value);
    return true;
});

function createWindow() {
    // Get the icon path - works for both dev and production
    const iconPath = path.join(__dirname, '../icon.png');

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: iconPath, // Set taskbar and window icon
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // Performance optimizations
            backgroundThrottling: false, // Keep app responsive when in background
            webgl: false, // Disable WebGL if not needed
        },
        autoHideMenuBar: true,
        frame: true,
        // Performance: Show window when ready to prevent white flash
        show: false,
        backgroundColor: '#1f1f23', // Match dark theme background
    });

    // Show window when content is ready to prevent white flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Confirm before closing the app - use IPC for custom Fluent UI dialog
    mainWindow.on('close', async (event) => {
        // If force close flag is set, allow close without confirmation
        if (isForceClose) {
            return;
        }

        // Check if user has chosen to skip the confirmation
        if (store.get('skipCloseConfirmation')) {
            return; // Allow close without confirmation
        }

        // Prevent the default close first
        event.preventDefault();

        // Send message to renderer to show custom Fluent UI dialog
        mainWindow.webContents.send('show-exit-dialog');
    });

    // Handle confirm exit from renderer
    ipcMain.on('confirm-exit', () => {
        isForceClose = true;
        if (mainWindow) {
            mainWindow.close();
        }
    });

    // Handle cancel exit from renderer
    ipcMain.on('cancel-exit', () => {
        // Do nothing, just cancel the close
        console.log('Exit cancelled by user');
    });

    // Open external links in default browser (works in both dev and prod)
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            require('electron').shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    // Also handle links that are clicked (not just window.open)
    mainWindow.webContents.on('will-navigate', (event, url) => {
        // Allow navigation within the app
        if (url.startsWith('app://') || url.startsWith('http://localhost')) {
            return;
        }
        // Open external URLs in browser
        if (url.startsWith('http://') || url.startsWith('https://')) {
            event.preventDefault();
            require('electron').shell.openExternal(url);
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:9002');
        mainWindow.webContents.openDevTools();
    } else {
        // Performance: Set up caching for faster page loads
        session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
            callback({ requestHeaders: { ...details.requestHeaders } });
        });

        // Use electron-serve to load the app
        appServe(mainWindow).then(() => {
            mainWindow.loadURL('app://-');
        });
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Performance: Optimize app startup
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
