import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsState } from './settings.state';
import { filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsStorageHook {
    private STORAGE_NAME = 'settings';

    constructor(private store: Store<any>, protected localStorage: LocalStorage) {
        this.store.select(state => state.Settings).pipe(
            filter((res: SettingsState) => res.settingChanged),
            map(res => res.settings),
            switchMap(res => this.localStorage.setItem(this.STORAGE_NAME, res))
        ).subscribe(res => {
            // Do nothing
        });
    }

    getSettings(): Observable<any> {
        return this.localStorage.getItem(this.STORAGE_NAME);
    }
}
