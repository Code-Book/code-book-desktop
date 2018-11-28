import { map, switchMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as settings from './settings.actions';
import { of } from 'rxjs';
import { SettingsStorageHook } from './settings.storage.hook';
import * as globalStore from '../global/global-store.actions';


@Injectable()
export class SettingsEffects {

  @Effect() loadInitialConfig$ = this.actions$
    .pipe(
      ofType(settings.LOAD_INITIAL_SETTINGS),
      map((action: settings.SetThemeAction) => action.payload),
      switchMap(payload => this.settingsStorageHook.getSettings()
        .pipe(map(res => {
          return ({ type: settings.LOAD_INITIAL_SETTINGS_SUCCESS, payload: res });
        }))
      ),
      catchError(() => {
        return of({ type: settings.LOAD_INITIAL_SETTINGS_SUCCESS, payload: null });
      })
    );

  @Effect() changeSetting$ = this.actions$
    .pipe(
      ofType(settings.SET_THEME),
      map((action: settings.SetThemeAction) => action.payload),
      map(res => {
        return {
          type: globalStore.ANALYTICS_EVENT, payload: {
            category: 'Setting',
            action: 'Theme',
            label: res
          }
        };
      }));

  constructor(
    protected settingsStorageHook: SettingsStorageHook,
    private actions$: Actions
  ) {

  }

}
