import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {

  template;

  parameterModel = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.template = JSON.parse(atob(this.route.snapshot.paramMap.get('template')));
    console.log(this.template);

    this.template.parameters.forEach(element => {
      this.parameterModel[element.name] = '';
    });
  }

  onGenerate() {
    console.log(this.parameterModel);
  }

}
