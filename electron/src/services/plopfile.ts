import * as nodePath from 'path';

function injectHelpers(plop: any, templatePath: string, defaultDestination: string) {
    plop.addHelper('__destinationDir', (path: any) => {
        if (path) { return nodePath.resolve(process.cwd(), path); }
        if (defaultDestination) { return nodePath.resolve(process.cwd(), defaultDestination); }
        return nodePath.resolve(process.cwd(), '.');
    });

    plop.addHelper('__templatePath', () => {
        return templatePath;
    });

    plop.addHelper('__toArray', (value: string, separator: string | RegExp = ',') => {
        const array = value.split(separator).map(function (item) {
            return item.trim();
        });;
        return array;
    });

    plop.addHelper('__toJson', (value: string) => {
        return JSON.parse(value);
    });
}

module.exports = function (plop: any) {
    let templatePath = '';
    let defaultDestination = '';
    process.argv.forEach(argument => {
        if (argument.includes('--templatePath')) {
            templatePath = argument.replace('--templatePath=', '').replace(/\/$/, '');
        }
        if (argument.includes('--defaultDestination')) {
            defaultDestination = argument.replace('--defaultDestination=', '').replace(/\/$/, '');
        }
    })

    injectHelpers(plop, templatePath, defaultDestination);

    const templateData = JSON.parse(require('fs').readFileSync(templatePath + '/template.json', 'utf8'));

    plop.setGenerator(
        templateData.name,
        {
            description: templateData.description,
            actions: templateData.actions,
            prompts: templateData.parameters
        })
};