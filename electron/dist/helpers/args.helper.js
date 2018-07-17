"use strict";
exports.__esModule = true;
var ArgsHelper = /** @class */ (function () {
    function ArgsHelper() {
    }
    ArgsHelper.isDevMode = function () {
        return process.argv && process.argv[2] && process.argv[2] === 'dev';
    };
    ArgsHelper.runFromLiveServer = function () {
        return process.argv && process.argv[3] && process.argv[3] === 'live';
    };
    return ArgsHelper;
}());
exports.ArgsHelper = ArgsHelper;
//# sourceMappingURL=args.helper.js.map