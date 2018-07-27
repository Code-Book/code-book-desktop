import { SettingsState } from './+stores/settings/settings.state';
import { State } from './core/ngrx.module';

export interface AppState extends State {
    Settings?: SettingsState;
}