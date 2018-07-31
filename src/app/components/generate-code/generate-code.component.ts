import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {

  template;

  parameterModel = {};

  constructor(
    private route: ActivatedRoute,
    private electronService: ElectronService) { }

  ngOnInit() {
    this.template = JSON.parse(atob(this.route.snapshot.paramMap.get('template')));
    console.log(this.template);

    this.template.parameters.forEach(element => {
      this.parameterModel[element.name] = '';
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
    if (this.electronService.isElectronApp) {
      const requestID = Math.floor(Math.random() * 100);
      this.electronService.ipcRenderer.on('TEMPLATE_GENERATE_RESPONSE' + `-${requestID}`, (event, arg) => {
        console.log(arg);
      });
      this.electronService.ipcRenderer.send('TEMPLATE_GENERATE_REQUEST', {
        uuid: requestID,
        path: this.template.path,
        parameters: this.buildParamterArray()
      });
    }
    console.log(this.parameterModel);
  }

}
