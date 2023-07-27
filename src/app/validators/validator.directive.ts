import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const customValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const countryCode = control.get('countryCode')?.value;
    const phoneNumber = control.get('phoneNumber')?.value;

    if (countryCode || phoneNumber) {
        return { 'isSelected': true }
    }

    return null
};