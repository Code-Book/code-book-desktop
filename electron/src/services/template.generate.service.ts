import { ipcMain } from "electron";
import * as nodePlop from 'node-plop';

export class TemplateGenerateService {

    constructor() {
        ipcMain.on('TEMPLATE_GENERATE_REQUEST', async (event: any, arg: any) => {
            event.sender.send(
                'TEMPLATE_GENERATE_RESPONSE' + `${arg.uuid ? '-' + arg.uuid : ''}`,
                await this.generateTemplate(arg.path, arg.parameters)
            )
        });
    }

    async generateTemplate(path: string, parameters: any): Promise<boolean> {
        process.argv.push(`--templatePath=${path}`);
        const plop = nodePlop(__dirname + `/plopfile.js`);

        const basicAdd = plop.getGenerator(plop.getGeneratorList()[0].name);
        basicAdd.runActions(parameters).then((results: any) => {
            console.log(results);
        });

        return true;
    }

}