import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';
import { SettingsStorageHook } from './settings.storage.hook';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('Settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  exports: [],
  declarations: []
})
export class SettingsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SettingsModule,
      providers: [SettingsStorageHook]
    };
  }
}

export * from './settings.actions';
export { SettingsState } from './settings.state';
