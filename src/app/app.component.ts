import { GlobalStoreState } from './+stores/global/global-store.state';
import { environment } from './../environments/environment';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged, filter, tap, pairwise, take, debounceTime } from 'rxjs/operators';
import { SetThemeAction, LoadInitialSettingSAction } from './+stores/settings/settings.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppState } from './app.state';
import { SearchHideAction, SearchShowAction, AnalyticsScreenAction } from './+stores/global/global-store.module';
import { Router, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  settingsAppTheme;
  themes = environment.themes;
  showSearchOption: any;

  constructor(
    public store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router,
    private activatedroute: ActivatedRoute,
    overlayContainer: OverlayContainer) {
    this.trackRouteChanges();
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
    this.showSearchOption = this.store.select(state => state.GlobalStore)
      .pipe(map((res: GlobalStoreState) => res.search.enabled), debounceTime(100));
  }

  setTheme(themeName: string) {
    this.store.dispatch(new SetThemeAction(themeName));
  }

  toggleSearch() {
    this.store.select(state => state.GlobalStore)
      .pipe(
        map((res: GlobalStoreState) => res.search.visible),
        take(1))
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new SearchHideAction());
        } else {
          this.store.dispatch(new SearchShowAction());
        }
      });
  }

  trackRouteChanges() {
    // this.router.events.subscribe((event: Event) => {

    //   if (event instanceof NavigationEnd) {

    //     console.log(this.activatedroute.snapshot.params);
    //     this.activatedroute.data.subscribe(res => {
    //       console.log(res);
    //     });
    //     // let yourqueryparameter = this.activatedroute.snapshot.queryparams.yourqueryparameter;


    //     // this.store.dispatch(new AnalyticsScreenAction({
    //     //   screenName: event.url
    //     // }));
    //   }

    //   if (event instanceof NavigationError) {

    //   }
    // });

  }
}
