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

    async generateTemplate(args: any): Promise<{
        success: boolean,
        message?: string
    }> {
        process.argv.push(`--templatePath=${args.path}`);
        process.argv.push(`--defaultDestination=${args.defaultDestination}`);
        const plop = nodePlop(__dirname + `/plopfile.js`);

        const basicAdd = plop.getGenerator(plop.getGeneratorList()[0].name);
        const templateRunResponse = await basicAdd.runActions(args.parameters);

        if (!!templateRunResponse.failures && templateRunResponse.failures.length <= 0) {
            return {
                success: true
            };
        } else {
            return {
                success: false,
                message: templateRunResponse.failures[0].error || 'Unable to generate code'
            };
        }
    }

}