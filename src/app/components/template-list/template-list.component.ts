import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import observeOnZone from '../../common/observeOnZone';
import { MatDialog } from '@angular/material';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templates: Array<any>;

  constructor(
    private electronService: ElectronService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private zone: NgZone) {
    this.templates = [];
  }

  ngOnInit() {
    this.store.select(state => state.Settings)
      .pipe(
        observeOnZone(this.zone),
        filter(res => !res.isLoading),
        map(res => res.settings.templatePaths),
      ).subscribe(templatePaths => {
        templatePaths.filesystem.forEach(templatePath => {
          if (this.electronService.isElectronApp) {
            const requestID = Math.floor(Math.random() * 100);
            this.electronService.ipcRenderer.on('TEMPLATE_LIST_RESPONSE' + `-${requestID}`, (event, arg) => {
              this.zone.run(() => {
                this.templates.push(...arg);
              });
            });
            this.electronService.ipcRenderer.send('TEMPLATE_LIST_REQUEST', {
              uuid: requestID,
              path: templatePath
            });
          }
        });
      });
  }

  generateTap() {
    // const dialogRef = this.dialog.open(TemplateGenerateComponent, {
    //   width: '100vw',
    //   height: '80hh'
    // });
  }

}
