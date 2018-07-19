import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule, AppNgrxModule, AppRoutingModule } from './core/index';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    AppNgrxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
