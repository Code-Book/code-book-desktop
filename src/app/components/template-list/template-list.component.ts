import { Observable } from 'rxjs';
import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Store } from '@ngrx/store';
import { filter, map, distinctUntilChanged, startWith } from 'rxjs/operators';
import observeOnZone from '../../common/observeOnZone';
import { AppState } from '../../app.state';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templates: Array<any>;

  public cols: Observable<number>;

  constructor(
    private electronService: ElectronService,
    private store: Store<AppState>,
    private observableMedia: ObservableMedia,
    private zone: NgZone) {
    this.templates = [];
  }

  ngOnInit() {

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
            this.zone.run(() => {
              this.templates.push(...arg);
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

}
