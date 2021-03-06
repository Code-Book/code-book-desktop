import * as fse from "fs-extra";
import { ipcMain } from "electron";

export class TemplateListService {

    constructor() {
        ipcMain.on('TEMPLATE_LIST_REQUEST', async (event: any, arg: any) => {
            event.sender.send(
                'TEMPLATE_LIST_RESPONSE' + `${arg.uuid ? '-' + arg.uuid : ''}`,
                await this.getListOfTemplates(arg.path)
            )
        });
    }

    async getListOfFolders(path: string): Promise<string[]> {
        let filesAndDirectories = await fse.readdir(path);

        const directories: string[] = [];
        await Promise.all(
            filesAndDirectories.map((name: string) => {
                return fse.stat(path + name)
                    .then((stat: any) => {
                        if (stat.isDirectory()) directories.push(name)
                    })
            })
        );
        return directories;
    }

    async getListOfTemplates(path: string): Promise<string[]> {
        let templates = await this.getListOfFolders(path);
        let templateDetails: any = [];
        templates.forEach(item => {
            if (require('fs').existsSync(path + item + '/template.json')) {
                templateDetails.push({
                    ...JSON.parse(require('fs').readFileSync(path + item + '/template.json', 'utf8')),
                    path: path + item,
                })
            }
        })

        return templateDetails;
    }
}