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
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  generateTap() {
    const dialogRef = this.dialog.open(GenerateCodeComponent, {
      width: '100vw',
      height: '80hh'
    });
  }
}
