import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SetThemeAction, SetDefaultDestinationPathAction, SetFileSystemTemplatePathAction } from '../../+stores/settings/settings.module';
import { AppState } from '../../app.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  themes = environment.themes;
  savedTemplatePath;
  defaultDestination;

  settings: FormGroup;

  constructor(private store: Store<AppState>, fb: FormBuilder) {
    this.settings = fb.group({
      theme: [''],
      fileSystemTemplatePath: [''],
      defaultDestination: ['']
    });

    this.settings.get('fileSystemTemplatePath').valueChanges.subscribe(e => {
      this.settings.get('fileSystemTemplatePath').setValue(e, { emitEvent: false });
    });

    this.settings.get('defaultDestination').valueChanges.subscribe(e => {
      this.settings.get('defaultDestination').setValue(e, { emitEvent: false });
    });
  }

  ngOnInit() {
    this.store.select(state => state.Settings).pipe(
      filter(res => !res.isLoading), map(res => res.settings)
    ).subscribe(res => {
      this.savedTemplatePath =
        (res.templatePaths && res.templatePaths.filesystem ? res.templatePaths.filesystem : '');

      this.defaultDestination =
        (res.defaultDestination || '');

      this.settings.patchValue({
        theme: res.theme,
        fileSystemTemplatePath: this.settings.get('fileSystemTemplatePath').value || this.savedTemplatePath,
        defaultDestination: this.settings.get('defaultDestination').value || this.defaultDestination
      });
    });

  }


  themeSelected(themeValue) {
    this.store.dispatch(new SetThemeAction(themeValue));
  }


  saveFileSystemTemplatePath(e) {
    this.store.dispatch(new SetFileSystemTemplatePathAction(this.settings.get('fileSystemTemplatePath').value));
  }

  saveDefaultDestination() {
    this.store.dispatch(new SetDefaultDestinationPathAction(this.settings.get('defaultDestination').value));
  }

}
