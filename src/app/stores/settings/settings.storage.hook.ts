import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsState } from './settings.state';
import { filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsStorageHook {
    constructor(private store: Store<any>, protected localStorage: LocalStorage) {
        this.store.select(state => state.Settings).pipe(
            filter((res: SettingsState) => res.settingChanged),
            map(res => res.settings),
            switchMap(res => this.localStorage.setItem('settings', res))
        ).subscribe(res => {
            console.log(res);
        });
    }

    getSettings(): Observable<any> {
        return this.localStorage.getItem('settings');
    }
}
