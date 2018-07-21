import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { AppMaterialModule } from './core';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: TemplateListComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppMaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [TemplateListComponent]
})
export class AppRoutingModule {
}
