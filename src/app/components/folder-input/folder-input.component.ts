import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-folder-input',
  templateUrl: './folder-input.component.html',
  styleUrls: ['./folder-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FolderInputComponent),
    multi: true
  }]
})
export class FolderInputComponent implements ControlValueAccessor {

  @Input() showSaveButton: boolean;
  @Input() label: string;
  @Input() hint: string;

  @Input() savedValue: string;

  @Output() eventSave = new EventEmitter<any>();

  _value;

  constructor() { }

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

  onChange(data) {
    this.propagateChange(data + '/');
  }

  onSaveEvent() {
    this.eventSave.emit(this._value);
  }

}
