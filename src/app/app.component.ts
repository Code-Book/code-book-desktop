import { MatDialog } from '@angular/material';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged, filter, tap, pairwise } from 'rxjs/operators';
import { SetThemeAction, LoadInitialSettingSAction, AddFileSystemTemplatePathAction } from './+stores/settings/settings.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppState } from './app.state';
import { SettingsComponent } from './components/settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  settingsAppTheme;

  constructor(
    public store: Store<AppState>,
    public dialog: MatDialog,
    overlayContainer: OverlayContainer,
    private elRef: ElementRef) {
    this.settingsAppTheme = this.store.select(state => state.Settings)
      .pipe(
        filter(res => !res.isLoading),
        map(res => res.settings.theme),
        distinctUntilChanged(),
        tap(res => {
          // elRef.nativeElement.ownerDocument.body.className = res;
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
    this.store.dispatch(new SetThemeAction(themeName));
  }

}
