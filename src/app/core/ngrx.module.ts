import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../environments/environment'; // Angular CLI environemnt
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterEffects } from './+router/router.effects';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
    title: string;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;
        const { params } = route;
        const title = route.data['title'];

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams, title };
    }
}

export interface State {
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
};

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([RouterEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router', // name of reducer key
        })
    ],
    providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
})
export class AppNgrxModule { }
