import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { GenerateCodeComponent } from '../generate-code/generate-code.component';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent implements OnInit {

  @Input() template: any;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  generateCode() {
    this.router.navigate(['generate-code', this.getBase64()]);
  }
  getBase64() {
    return btoa(JSON.stringify(this.template));
  }
}
