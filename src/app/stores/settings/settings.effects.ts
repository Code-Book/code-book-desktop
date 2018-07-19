import { switchMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SettingsService } from './settings.service';
import * as settings from './settings.actions';
import { of } from 'rxjs';

@Injectable()
export class SettingsEffects {

  // @Effect({dispatch: false} get$ = this.actions$
  //   .pipe(
  //     ofType(settings.SET_THEME),
  //     switchMap((payload) => this.settingsService.get()
  //       .pipe(
  //         map((res) => ({ type: settings.GET_SUCCESS, payload: res.json() })),
  //         catchError(() => of({ type: settings.GET_ERROR }))))
  //   );

  constructor(
    private settingsService: SettingsService,
    private actions$: Actions
  ) { }

}
