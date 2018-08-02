import * as nodePath from 'path';

function injectHelpers(plop: any, templatePath: string) {
    plop.addHelper('__destinationDir', (path: any) => {
        if (path) { return nodePath.resolve(process.cwd(), path); }
        return nodePath.resolve(process.cwd(), '.');
    });

    plop.addHelper('__templatePath', () => {
        return templatePath;
    });
}

module.exports = function (plop: any) {
    let templatePath = '';
    process.argv.forEach(argument => {
        if (argument.includes('--templatePath')) {
            templatePath = argument.replace('--templatePath=', '').replace(/\/$/, '');
        }
    })

    injectHelpers(plop, templatePath);

    const templateData = require(templatePath + '/template.json')

    plop.setGenerator(
        templateData.name,
        {
            description: templateData.description,
            actions: templateData.actions,
            prompts: templateData.parameters
        })
};