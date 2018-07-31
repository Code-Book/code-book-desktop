import * as fse from "fs-extra";
import { ipcMain } from "electron";

export class TemplateGenerateService {

    constructor() {
        ipcMain.on('TEMPLATE_GENERATE_REQUEST', async (event: any, arg: any) => {
            event.sender.send(
                'TEMPLATE_GENERATE_RESPONSE' + `${arg.uuid ? '-' + arg.uuid : ''}`,
                await this.generateTemplate(arg.path, arg.parameters)
            )
        });
    }

    async generateTemplate(path: string, parameters: string[]): Promise<boolean> {
        console.log(path);
        console.log(parameters);

        return true;
    }

}