import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { customValidation } from "../validators/validator.directive";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PhoneComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PhoneComponent
    }
  ]
})
export class PhoneComponent implements ControlValueAccessor, Validators {

  constructor(private fb: FormBuilder) { }

  phoneForm: FormGroup = this.fb.group({
    countryCode: [''],
    phoneNumber: ['']
  }, { validators: customValidation });

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

  validate(control: AbstractControl) {
    if (this.phoneForm.valid) {
      return null;
    }

    let errors: any = {};

    //request api and assign error to the object
    errors.isPhoneValid = false

    // if you have to validate errors on the contryCode select or phoneNumber input you can manage to assign a property to 
    // the errors object here.

    errors = this.addControlErrors(errors, "countryCode");
    errors = this.addControlErrors(errors, "phoneNumber");

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {

    const errors = { ...allErrors };

    const controlErrors = this.phoneForm.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

}
