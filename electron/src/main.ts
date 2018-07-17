import {
    app,
    BrowserWindow,
    Menu
} from 'electron';
import * as path from "path";
import * as url from 'url';
import { ArgsHelper } from './helpers/args.helper';
import { MenuProvider } from './menu.provider';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScrsipt object is garbage collected.
let mainWindow: Electron.BrowserWindow;

// Hack for SSL error
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
});

// We are good to do our custom stuff once app is ready
app.on('ready', () => {
    createWindow();
    init();
});

// If user closes all finds' let's just quit the app
app.on('window-all-closed', () => {
    app.quit();
})

// Only on Mac, after a temp close of app
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
        init();
    }
})

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        title: "CodeBook"
    })

    if (ArgsHelper.isDevMode() && ArgsHelper.runFromLiveServer()) {
        console.log("RUNNING IN DEV MODE");
        mainWindow.loadURL("http://localhost:4200")
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../www/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}


function init() {
    const menuTemplate = new MenuProvider(mainWindow);
    const menu = Menu.buildFromTemplate(menuTemplate.getMenu());
    Menu.setApplicationMenu(menu);
}
