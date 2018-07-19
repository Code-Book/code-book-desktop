import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from './stores/stores.module';
import { SetThemeAction } from './stores/settings/settings.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  settingsAppTheme;

  constructor(public store: Store<AppState>) {
    this.settingsAppTheme = this.store.select(state => state.Settings).pipe(map(res => res.theme), distinctUntilChanged());
  }

  setTheme(themeName: string) {
    this.store.dispatch(new SetThemeAction(themeName));
  }
}
