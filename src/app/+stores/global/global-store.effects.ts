import { ElectronService } from 'ngx-electron';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as globalStore from './global-store.actions';

@Injectable()
export class GlobalStoreEffects {

  @Effect({ dispatch: false }) analyticsEvent$ = this.actions$
    .pipe(
      ofType(globalStore.ANALYTICS_EVENT),
      map((action: globalStore.AnalyticsEventAction) => action.payload),
      map((payload) => {
        this._electronService.remote.getGlobal('analyticsHelper')
          .trackEvent(payload.category, payload.action, payload.label, payload.value);
      })
    );

  @Effect({ dispatch: false }) analyticsScreen$ = this.actions$
    .pipe(
      ofType(globalStore.ANALYTICS_SCREEN),
      map((action: globalStore.AnalyticsScreenAction) => action.payload),
      map((payload) => {
        this._electronService.remote.getGlobal('analyticsHelper')
          .trackPage(payload.path, payload.title);
      })
    );

  @Effect({ dispatch: false }) search$ = this.actions$
    .pipe(
      ofType(globalStore.SEARCH_SHOW, globalStore.SEARCH_HIDE),
      map((payload) => {
        this._electronService.remote.getGlobal('analyticsHelper')
          .trackEvent('Search', 'Visibility', payload.type);
      })
    );

  constructor(
    private actions$: Actions,
    private _electronService: ElectronService,
  ) {
    this._electronService.remote.getGlobal('analyticsHelper').trackEvent('Test', 'From Effect', 'Demo', 'none');
  }

}
