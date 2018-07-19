import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './ngrx.module';
import { SettingsState } from '../settings/settings.state';


export interface AppState {
    router: RouterReducerState<RouterStateUrl>;
    Settings?: SettingsState;
}
