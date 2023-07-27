import { Component } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PhoneComponent
    }
  ]
})
export class PhoneComponent implements ControlValueAccessor {

  constructor(private fb: FormBuilder) { }

  phoneForm: FormGroup = this.fb.group({
    countryCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });

  // onTouched: Function = () => { };

  onChangeSubs: Subscription[] = [];

  private onChangeCallback: (value: any) => void = () => { };

  // this method is called by the Forms module to write a value into a form control
  writeValue(value: any): void {
    if (value) {
      this.phoneForm.setValue(value, { emitEvent: false });
    }
  }

  // When a form value changes due to user input, we need to report the value back to the parent form. This is done by calling a 
  // callback, that was initially registered with the control using the registerOnChange method
  registerOnChange(onChange: any): void {
    this.onChangeCallback = onChange;

    const sub = this.phoneForm.valueChanges.subscribe(this.onChangeCallback);
    this.onChangeSubs.push(sub);
  }
  // When the user first interacts with the form control, the control is considered to have the status touched, 
  // which is useful for styling. In order to 
  // report to the parent form that the control was touched, we need to use a callback registered using the registerOnToched method
  registerOnTouched(onTouched: Function): void {
    // this.onTouched = onTouched;
  }

  // form controls can be enabled and disabled using the Forms API. This state can be transmitted to the form control via the setDisabledState method
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  onFieldChange(): void {
    const { phoneNumber, countryCode } = this.phoneForm.value;
    const concatenatedNumber = `${countryCode}${phoneNumber}`;

    this.onChangeCallback(concatenatedNumber);
  }

}
