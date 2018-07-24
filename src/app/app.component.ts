import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged, filter, tap, pairwise } from 'rxjs/operators';
import { AppState } from './stores/stores.module';
import { SetThemeAction, LoadInitialSettingSAction, AddFileSystemTemplatePathAction } from './stores/settings/settings.module';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  settingsAppTheme;

  constructor(public store: Store<AppState>, overlayContainer: OverlayContainer) {
    this.settingsAppTheme = this.store.select(state => state.Settings)
      .pipe(
        filter(res => !res.isLoading),
        map(res => res.settings.theme),
        distinctUntilChanged(),
        tap(res => {
          overlayContainer.getContainerElement().classList.add(res);
        }));

    this.settingsAppTheme.pipe(pairwise(),
      tap(res => {
        if (overlayContainer.getContainerElement().classList.contains(res[0])) {
          overlayContainer.getContainerElement().classList.remove(res[0]);
        }
        overlayContainer.getContainerElement().classList.add(res[1]);
      })).subscribe(() => { });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadInitialSettingSAction());
  }

  setTheme(themeName: string) {
    // TODO
    this.store.dispatch(new AddFileSystemTemplatePathAction('/Users/sanchit.gupta/Desktop/sampleTemplates 2/'));
    this.store.dispatch(new SetThemeAction(themeName));
  }
}
