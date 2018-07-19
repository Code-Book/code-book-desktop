import { AppNgrxModule } from '../core/index';
import { NgModule } from '@angular/core';
import { SettingsModule } from './settings/settings.module';
import { State } from './../core/ngrx.module';
import { SettingsState } from './settings/settings.state';

export interface AppState extends State {
    Settings?: SettingsState;
}

@NgModule({
    imports: [
        AppNgrxModule,
        SettingsModule.forRoot()
    ]
})
export class AppStoresModule { }
