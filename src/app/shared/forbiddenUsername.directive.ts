import { AbstractControl } from '@angular/forms';


/**
 * Function to validate a username.
 * 
 * @param {AbstractControl} control value to be evaluated
 * @returns {boolean} true if username is valid, false otherwise
 */ 
export function ForbiddenUsernameValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let reg = new RegExp('^(?=.{6,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$');
        const notForbidden = reg.test(control.value);
        return notForbidden ? null : {'forbiddenUsername': {value: control.value}};
      };
  }