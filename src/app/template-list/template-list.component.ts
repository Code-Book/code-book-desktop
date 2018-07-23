import { Constants } from './../../../common/Constants';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  items = [
    'Temp 1',
    'Temp 2'
  ];
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    if (this.electronService.isElectronApp) {
      const requestID = Math.floor(Math.random() * 100);
      this.electronService.ipcRenderer.on(Constants.TEMPLATE_LIST_RESPONSE + `-${requestID}`, (event, arg) => {
        console.log(arg);
      });
      this.electronService.ipcRenderer.send(Constants.TEMPLATE_LIST_REQUEST, {
        uuid: requestID,
        path: '/Users/sanchit.gupta/Documents/Personal/code-book/electron/sampleTemplates/'
      });
    }
  }

}
