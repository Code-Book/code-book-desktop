import { AppNgrxModule } from '../core/index';
import { NgModule } from '@angular/core';
import { SettingsModule } from './settings/settings.module';

@NgModule({
    imports: [
        AppNgrxModule,
        SettingsModule.forRoot()
    ]
})
export class AppStoresModule { }
