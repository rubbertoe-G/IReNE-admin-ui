import { AbstractControl } from '@angular/forms';


/**
 * Function to validate a username.
 * 
 * @param {AbstractControl} control value to be evaluated
 * @returns {boolean} true if username is valid, false otherwise
 */ 
export function ForbiddenUsernameValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let reg = new RegExp('^[a-zA-Z0-9.]{6,20}$');
        let notForbidden = reg.test(control.value);
        if(notForbidden){
            notForbidden = !new RegExp('[.]{2,}').test(control.value);
            if(notForbidden){
                notForbidden = !(control.value.charAt(control.value.length-1) == '.' || control.value.charAt(0) == '.');
            }
        }
        return notForbidden ? null : {'forbiddenUsername': {value: control.value}};
      };
  }