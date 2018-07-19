import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/index';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';

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
  title = 'app';
}
