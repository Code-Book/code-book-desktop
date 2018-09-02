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
import { FolderInputComponent } from './folder-input/folder-input.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import { RatingComponent } from './rating/rating.component';
import { CodeGenerateGuard } from '../guards/code-generate.guard';

const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: '', component: TemplateListComponent },
    { path: 'generate-code/:template', component: GenerateCodeComponent, canActivate: [CodeGenerateGuard] }
];

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 200,
    touchendHideDelay: 200,
};

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FlexLayoutModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule],
    declarations: [
        TemplateListComponent,
        GenerateCodeComponent,
        SettingsComponent,
        AboutComponent,
        TemplateItemComponent,
        FeedbackComponent,
        RatingComponent,
        FolderInputComponent],
    providers: [
        CodeGenerateGuard,
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ]
})
export class AppRoutingModule {
}
