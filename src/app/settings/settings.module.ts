import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SettingsService } from './settings.service';
import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';

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
      providers: [SettingsService]
    };
  }
}

export { SettingsService } from './settings.service';
export * from './settings.actions';
export { SettingsState } from './settings.state';
