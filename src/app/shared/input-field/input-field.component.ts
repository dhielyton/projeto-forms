import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(() => InputFieldComponent),
  multi:true
};
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers:[INPUT_FIELD_VALUE_ACESSOR]
})
export class InputFieldComponent implements  ControlValueAccessor {

  @Input() classeCSS;
  @Input() id: string;
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() control;
  @Input() isReadOnly = false;

  private innerValue: any;
  get value():any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }
  constructor() { }

  onChangeCb: (_: any) => void = () => { };
  onTouchedCb: (_: any) => void = () => { };

  ngOnInit() {
  }
  writeValue(v: any): void {
    this.value = v;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
