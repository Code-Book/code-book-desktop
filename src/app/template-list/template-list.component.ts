import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
