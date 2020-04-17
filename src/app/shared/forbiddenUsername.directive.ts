import { AbstractControl } from '@angular/forms';

export function ForbiddenUsernameValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let reg = new RegExp('^(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$');
        const notForbidden = reg.test(control.value);
        return notForbidden ? null : {'forbiddenUsername': {value: control.value}};
      };
  }