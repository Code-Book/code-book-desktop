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

  // generateTap() {
  //   const dialogRef = this.dialog.open(GenerateCodeComponent, {
  //     width: '100vw',
  //     height: '80hh',
  //     panelClass: 'code-generate-panel',
  //     data: {
  //       template: this.template
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  generateCode() {
    this.router.navigate(['generate-code', this.getBase64()]);
  }
  getBase64() {
    return btoa(JSON.stringify(this.template));
  }
}
