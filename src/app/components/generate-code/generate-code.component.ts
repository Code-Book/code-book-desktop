import { AnalyticsEventAction } from 'src/app/+stores/global/global-store.module';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { AppState } from '../../app.state';
import { MatSnackBar } from '@angular/material';
import { CodeGenerateHelper } from '../../helpers/code-generate.heler';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {

  template;
  parameterModel = {};
  settings;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private electronService: ElectronService,
    public snackBar: MatSnackBar,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(state => state.Settings)
      .pipe(filter(res => !res.isLoading && !!res.settings), map(res => res.settings))
      .subscribe(res => {
        this.settings = res;
      });
    this.template = JSON.parse(atob(this.route.snapshot.paramMap.get('template')));

    this.template.parameters.forEach(element => {
      this.parameterModel[element.name] = element.default || '';
    });
  }

  buildParamterArray(): string[] {
    const parameters = [];
    this.template.parameters.forEach(element => {
      parameters.push(this.parameterModel[element.name]);
    });
    return parameters;
  }

  onGenerate() {
    if (CodeGenerateHelper.validateModel(this.template.parameters, this.parameterModel)) {
      if (this.electronService.isElectronApp) {
        const requestID = Math.floor(Math.random() * 100);
        this.electronService.ipcRenderer.on('TEMPLATE_GENERATE_RESPONSE' + `-${requestID}`, (event, arg) => {
          if (arg.success) {

            this.store.dispatch(new AnalyticsEventAction({
              category: 'GenerateCode',
              action: 'Success'
            }));

            this.zone.run(() => {
              this.router.navigate(['']);
            });
          } else {

            this.store.dispatch(new AnalyticsEventAction({
              category: 'GenerateCode',
              action: 'Error',
              label: arg.message
            }));

          }
        });
        this.electronService.ipcRenderer.send('TEMPLATE_GENERATE_REQUEST', {
          uuid: requestID,
          path: this.template.path,
          parameters: this.parameterModel,
          defaultDestination: this.settings.defaultDestination
        });
      }
    } else {

      this.store.dispatch(new AnalyticsEventAction({
        category: 'GenerateCode',
        action: 'Error',
        label: 'Missing Parameters'
      }));

      this.snackBar.open('Some Parameters are missing', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        politeness: 'assertive'
      });
    }
  }


}
