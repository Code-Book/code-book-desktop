"use strict";
exports.__esModule = true;
var nodePath = require("path");
function buildFromJson(plop, jsonPath) {
    var data = require(jsonPath);
    plop.setGenerator(data.name, {
        description: data.description,
        actions: data.actions,
        prompts: data.parameters
    });
}
function injectHelpers(plop) {
    plop.addHelper('baseDir', function (path) {
        if (path) {
            return nodePath.resolve(process.cwd(), path);
        }
        return nodePath.resolve(process.cwd(), '.');
    });
}
module.exports = function (plop) {
    injectHelpers(plop);
    buildFromJson(plop, './temp/run.json');
};
//# sourceMappingURL=plopfile.js.map