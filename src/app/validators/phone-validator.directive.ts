import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AsyncValidatorExample implements AsyncValidator {
  constructor(@Inject('apiService') private apiService: any) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.apiService.validateApi(control.get('countryCode')?.value, control.get('phoneNumber')?.value).pipe(
      map(isValid => (isValid ? { isValidPhoneNumber: true } : null)),
      catchError(() => of(null))
    );
  }
}