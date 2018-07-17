import { BrowserWindow, app, MenuItem, MenuItemConstructorOptions } from "electron";
import * as path from 'path';
import * as url from 'url';
import { ArgsHelper } from "./helpers/args.helper";

export class MenuProvider {
    private window: Electron.BrowserWindow;

    constructor(window: Electron.BrowserWindow) {
        this.window = window;
    }

    public getMenu(): MenuItemConstructorOptions[] {
        let template: any = [
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
            }];

        if (ArgsHelper.isDevMode()) {
            template.push(this.getDebugMenu())
        }

        return template;
    }

    private getDebugMenu() {
        return {
            label: 'Debug',
            submenu: [
                {
                    label: 'Reload',
                    role: 'Reload',
                    click(menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) {
                        if (browserWindow) browserWindow.reload()
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    role: 'DevTools',
                    accelerator: 'CmdOrCtrl+I',
                    click(menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) {
                        if (browserWindow) browserWindow.webContents.toggleDevTools()
                    }
                }
            ]
        }
    }

} 