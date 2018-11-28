import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as RouterActions from './router.actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from '../ngrx.module';

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActions.BACK),
        tap(() => this.location.back())
    );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(RouterActions.FORWARD),
        tap(() => this.location.forward())
    );

    @Effect()
    updateTitle$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map((action: RouterNavigationAction<RouterStateUrl>) => {
            return ({
                type: '[Global Store] Analytics Screen', payload: {
                    path: action.payload.routerState.url,
                    title: action.payload.routerState.title
                }
            });
        }));

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) { }
}
