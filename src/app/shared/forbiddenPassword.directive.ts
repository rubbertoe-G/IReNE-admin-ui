import { AbstractControl } from '@angular/forms';


/**
 * Function to validate a password.
 * 
 * @param {AbstractControl} control value to be evaluated
 * @returns {boolean} true if password is valid, false otherwise
 */ 
export function ForbiddenPasswordValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
        const notForbidden = reg.test(control.value);
        return notForbidden ? null : {'forbiddenPassword': {value: control.value}};
      };
  }