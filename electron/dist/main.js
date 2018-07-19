"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var args_helper_1 = require("./helpers/args.helper");
var menu_provider_1 = require("./menu.provider");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScrsipt object is garbage collected.
var mainWindow;
// Hack for SSL error
electron_1.app.on('certificate-error', function (event, webContents, url, error, certificate, callback) {
    event.preventDefault();
    callback(true);
});
// We are good to do our custom stuff once app is ready
electron_1.app.on('ready', function () {
    createWindow();
    init();
});
// If user closes all finds' let's just quit the app
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
// Only on Mac, after a temp close of app
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
        init();
    }
});
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 420,
        height: 420,
        title: "CodeBook",
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            devTools: true
        }
    });
    if (args_helper_1.ArgsHelper.isDevMode() && args_helper_1.ArgsHelper.runFromLiveServer()) {
        console.log("RUNNING IN DEV MODE");
        mainWindow.loadURL("http://localhost:4200");
    }
    else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../www/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
function init() {
    var menuTemplate = new menu_provider_1.MenuProvider(mainWindow);
    var menu = electron_1.Menu.buildFromTemplate(menuTemplate.getMenu());
    electron_1.Menu.setApplicationMenu(menu);
}
//# sourceMappingURL=main.js.map