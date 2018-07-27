import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './core/index';
import { CommonModule } from '@angular/common';
import { AppStoresModule } from './+stores/stores.module';
import { NgxElectronModule } from 'ngx-electron';
import { AppRoutingModule } from './components/routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    AppStoresModule,
    NgxElectronModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
