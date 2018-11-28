import { AnalyticsEventAction } from 'src/app/+stores/global/global-store.module';
import { SearchDisableAction, SearchEnableAction } from './../../+stores/global/global-store.actions';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Store } from '@ngrx/store';
import { filter, map, distinctUntilChanged, startWith, debounceTime } from 'rxjs/operators';
import observeOnZone from '../../common/observeOnZone';
import { AppState } from '../../app.state';
import { ObservableMedia } from '@angular/flex-layout';
import { GlobalStoreState } from 'src/app/+stores/global/global-store.state';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit, OnDestroy {
  templates: Array<any>;
  originalTemplates: Array<any>;

  public cols: Observable<number>;

  showSearchOption: any;

  searchTerm$: Subject<string>;

  constructor(
    private electronService: ElectronService,
    private store: Store<AppState>,
    private observableMedia: ObservableMedia,
    private zone: NgZone) {
    this.templates = [];
    this.originalTemplates = [];
    this.searchTerm$ = new Subject<string>();
  }

  onFind(event: any) {
    this.searchTerm$.next(event);
  }

  ngOnInit() {

    this.store.dispatch(new SearchEnableAction());

    this.showSearchOption = this.store.select(state => state.GlobalStore)
      .pipe(map((res: GlobalStoreState) => res.search.visible));

    this.searchTerm$.pipe(debounceTime(500), distinctUntilChanged()).subscribe(searchTerm => {
      this.templates = this.originalTemplates.filter(res => {
        return res.name.toLowerCase().trim().indexOf(searchTerm.toLowerCase().trim()) > -1;
      });

      this.store.dispatch(new AnalyticsEventAction({
        category: 'Template',
        action: 'Search',
        label: 'ResultCount',
        value: this.templates.length
      }));

    });

    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 3],
      ['lg', 3],
      ['xl', 4]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable().pipe(map(change => {
      return grid.get(change.mqAlias);
    }), startWith(start));

    this.store.select(state => state.Settings)
      .pipe(
        observeOnZone(this.zone),
        filter(res => !res.isLoading),
        map(res => res.settings.templatePaths),
        distinctUntilChanged()
      ).subscribe(templatePaths => {
        if (this.electronService.isElectronApp) {
          const requestID = Math.floor(Math.random() * 100);
          this.electronService.ipcRenderer.on('TEMPLATE_LIST_RESPONSE' + `-${requestID}`, (event, arg) => {

            this.store.dispatch(new AnalyticsEventAction({
              category: 'Template',
              action: 'Load',
              label: 'ResultCount',
              value: arg.length
            }));

            this.zone.run(() => {
              this.templates.push(...arg);
              this.originalTemplates.push(...arg);
            });
          });
          this.electronService.ipcRenderer.send('TEMPLATE_LIST_REQUEST', {
            uuid: requestID,
            path: templatePaths.filesystem
          });
        }
      });
  }

  getHeightWidthratio(count) {
    if (count === 4) {
      return '2:1';
    }
    if (count === 3) {
      return '2:1';
    }
    if (count === 2) {
      return '3:1.5';
    }
    if (count === 1) {
      return '3:1';
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SearchDisableAction());
  }

}
