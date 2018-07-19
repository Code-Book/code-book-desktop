import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule, AppRoutingModule } from './core/index';
import { CommonModule } from '@angular/common';
import { AppStoresModule } from './stores/stores.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    AppStoresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
