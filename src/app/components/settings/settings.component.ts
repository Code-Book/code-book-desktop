import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SetThemeAction } from '../../+stores/settings/settings.module';
import { AppState } from '../../app.state';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  themes = [
    {
      name: 'MidNight',
      value: 'dark-theme'
    },
    {
      name: 'White Light',
      value: 'light-theme'
    },
    {
      name: 'Ferrari',
      value: 'red-theme'
    }
  ];

  settings: FormGroup;

  constructor(private store: Store<AppState>, fb: FormBuilder) {
    this.settings = fb.group({
      theme: [''],
    });
  }

  ngOnInit() {
    this.store.select(state => state.Settings).pipe(
      filter(res => !res.isLoading), map(res => res.settings)
    ).subscribe(res => {
      this.settings.patchValue({
        theme: res.theme
      });
    });

  }

  themeSelected(themeValue) {
    this.store.dispatch(new SetThemeAction(themeValue));
  }


}
