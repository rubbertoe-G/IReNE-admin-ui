import { AbstractControl } from '@angular/forms';

export function ForbiddenUsernameValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let reg = new RegExp('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
        const notForbidden = reg.test(control.value);
        return notForbidden ? null : {'forbiddenUsername': {value: control.value}};
      };
  }