import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  convertToTitleCase(inputStr: string) {
    let returnStr = '';
    if (inputStr && inputStr !== null) {
      inputStr = inputStr.toLowerCase();
      returnStr = inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
    }
    return returnStr;
  }

  mustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({
          mustMatch: true
        });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getUTCDate(inputDate: Date) {
    return new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
  }
}
