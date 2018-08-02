import { ipcMain } from "electron";
import * as nodePlop from 'node-plop';

export class TemplateGenerateService {

    constructor() {
        ipcMain.on('TEMPLATE_GENERATE_REQUEST', async (event: any, args: any) => {
            event.sender.send(
                'TEMPLATE_GENERATE_RESPONSE' + `${args.uuid ? '-' + args.uuid : ''}`,
                await this.generateTemplate(args)
            )
        });
    }

    async generateTemplate(args: any): Promise<boolean> {
        process.argv.push(`--templatePath=${args.path}`);
        process.argv.push(`--defaultDestination=${args.defaultDestination}`);
        const plop = nodePlop(__dirname + `/plopfile.js`);

        const basicAdd = plop.getGenerator(plop.getGeneratorList()[0].name);
        basicAdd.runActions(args.parameters).then((results: any) => {
            console.log(results);
        });

        return true;
    }

}