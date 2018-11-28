import * as ua from 'universal-analytics';
import * as uuid from 'uuid/v4';
import { JSONStorage } from 'node-localstorage';
import * as os from 'os';

export class AnalyticsHelper {

    nodeStorage: any;
    userId: string;
    usr: ua.Visitor;

    constructor(app: any) {
        this.nodeStorage = new JSONStorage(app.getPath('userData'));
        this.userId = this.nodeStorage.getItem('uid') || uuid();
        this.nodeStorage.setItem('uid', this.userId);
        this.usr = ua('UA-129895816-1', this.userId);
        this.usr.set('system_arch', 'os.arch()')
        this.usr.set('system_platform', 'os.platform()')
        this.usr.set('system_os_version', 'os.release()')
        this.usr.set('system_os_type', 'os.type()')
        this.usr.set('app_version', '0.0.1')
    }

    public trackEvent(category: string, action: string, label?: string, value?: number) {
        this.usr.event({
            ec: category,
            ea: action,
            el: label,
            ev: value
        }).send();
    }

    public trackPage(path: string, title: string) {
        this.usr.pageview(path, 'n/a', title).send()
    }


}

