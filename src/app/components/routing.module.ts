import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { AppMaterialModule } from '../core';
import { BrowserModule } from '@angular/platform-browser';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: '', component: TemplateListComponent },
    { path: 'generate-code', component: GenerateCodeComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppMaterialModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: [TemplateListComponent, GenerateCodeComponent, SettingsComponent]
})
export class AppRoutingModule {
}
