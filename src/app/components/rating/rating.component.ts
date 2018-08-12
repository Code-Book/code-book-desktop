import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
  }]
})
export class RatingComponent implements OnInit, ControlValueAccessor {

  @Input('label') private label: string;
  @Input('starCount') private starCount = 5;

  _value;

  private ratingArr = [];

  constructor() {
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  get value() {
    return this._value;
  }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.propagateChange(v);
    }
  }

  propagateChange: any = () => { };

  writeValue(value: any) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onChange(data: number) {
    this.propagateChange(data);
  }

  showIcon(index: number) {
    if (this._value >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
