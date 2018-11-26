import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GlobalStoreService } from './global-store.service';
import * as globalStore from './global-store.actions';

@Injectable()
export class GlobalStoreEffects {

  @Effect({ dispatch: false }) searchEnabe$ = this.actions$
    .pipe(
      ofType(globalStore.SEARCH_ENABLE),
      tap(() => console.log('Called Action SEARCH_ENABLE')));

  @Effect({ dispatch: false }) searchDisable$ = this.actions$
    .pipe(
      ofType(globalStore.SEARCH_DISABLE),
      tap(() => console.log('Called Action SEARCH_DISABLE')));

  @Effect({ dispatch: false }) searchShow$ = this.actions$
    .pipe(
      ofType(globalStore.SEARCH_SHOW),
      tap(() => console.log('Called Action SEARCH_SHOW')));

  @Effect({ dispatch: false }) searchHide$ = this.actions$
    .pipe(
      ofType(globalStore.SEARCH_HIDE),
      tap(() => console.log('Called Action SEARCH_HIDE')));


  constructor(
    private globalStoreService: GlobalStoreService,
    private actions$: Actions
  ) { }

}
