import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ArrayInputComponent),
    multi: true
  }]
})
export class ArrayInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() hint: string;

  _value: any[] = [];

  items = [{ position: 1, value: '', backSpaceCount: 1 }];

  constructor() { }

  get value(): any[] {
    return this._value || [];
  }
  set value(v: any[]) {
    if (v !== this._value) {
      this._value = v;
      this.propagateChange(v);
    }
  }

  propagateChange: any = () => { };

  writeValue(value: any) {
    if (value !== undefined) {
      this._value = value;
      this.propagateChange(this.value);
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  updateChanges() {
    this.value = this.items.filter(res => res.value !== '').map(res => {
      return res.value;
    });
    this.writeValue(this.value);
  }

  add() {
    this.items.push({ position: this.items.length + 1, value: '', backSpaceCount: 0 });
  }

  remove(position: number) {
    this.items = this.items.filter(res => {
      return res.position !== position;
    });
    this.updateChanges();
  }

}
