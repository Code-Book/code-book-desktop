import * as nodePath from 'path';

function buildFromJson(plop: any, jsonPath: string) {
    const data = require(jsonPath)
    plop.setGenerator(
        data.name,
        {
            description: data.description,
            actions: data.actions,
            prompts: data.parameters
        })
}

function injectHelpers(plop: any) {
    plop.addHelper('baseDir', (path: any) => {
        if (path) { return nodePath.resolve(process.cwd(), path); }
        return nodePath.resolve(process.cwd(), '.');
    });
}

module.exports = function (plop: any) {
    injectHelpers(plop);
    buildFromJson(plop, './temp/run.json');
};