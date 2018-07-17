"use strict";
exports.__esModule = true;
var args_helper_1 = require("./helpers/args.helper");
var MenuProvider = /** @class */ (function () {
    function MenuProvider(window) {
        this.window = window;
    }
    MenuProvider.prototype.getMenu = function () {
        var template = [
            {
                label: "Edit",
                submenu: [
                    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
                ]
            }
        ];
        if (args_helper_1.ArgsHelper.isDevMode()) {
            template.push(this.getDebugMenu());
        }
        return template;
    };
    MenuProvider.prototype.getDebugMenu = function () {
        return {
            label: 'Debug',
            submenu: [
                {
                    label: 'Reload',
                    role: 'Reload',
                    click: function (menuItem, browserWindow, event) {
                        if (browserWindow)
                            browserWindow.reload();
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    role: 'DevTools',
                    accelerator: 'CmdOrCtrl+I',
                    click: function (menuItem, browserWindow, event) {
                        if (browserWindow)
                            browserWindow.webContents.toggleDevTools();
                    }
                }
            ]
        };
    };
    return MenuProvider;
}());
exports.MenuProvider = MenuProvider;
//# sourceMappingURL=menu.provider.js.map