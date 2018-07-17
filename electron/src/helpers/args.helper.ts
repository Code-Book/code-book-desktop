export class ArgsHelper {
    public static isDevMode() {
        return process.argv && process.argv[2] && process.argv[2] === 'dev';
    }

    public static runFromLiveServer() {
        return process.argv && process.argv[3] && process.argv[3] === 'live';
    }
}