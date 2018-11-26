import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GlobalStoreService } from './global-store.service';
import { globalStoreReducer } from './global-store.reducer';
import { GlobalStoreEffects } from './global-store.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('GlobalStore', globalStoreReducer),
    EffectsModule.forFeature([GlobalStoreEffects])
  ],
  exports: [],
  declarations: []
})
export class GlobalStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalStoreModule,
      providers: [GlobalStoreService]
    };
  }
}

export { GlobalStoreService } from './global-store.service';
export * from './global-store.actions';
export { GlobalStoreState } from './global-store.state';
