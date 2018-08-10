import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { AppMaterialModule } from '../core';
import { BrowserModule } from '@angular/platform-browser';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { TemplateItemComponent } from './template-item/template-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FolderInputComponent } from '../folder-input/folder-input.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: '', component: TemplateListComponent },
    { path: 'generate-code/:template', component: GenerateCodeComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FlexLayoutModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: [
        TemplateListComponent,
        GenerateCodeComponent,
        SettingsComponent,
        AboutComponent,
        TemplateItemComponent,
        FeedbackComponent,
        FolderInputComponent]
})
export class AppRoutingModule {
}
