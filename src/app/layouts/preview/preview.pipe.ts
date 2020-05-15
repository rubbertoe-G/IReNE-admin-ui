import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


/**
 * Pipe that manages the sanitation of the backend html code.
*/
@Pipe({
  name: 'preview'
})
export class PreviewPipe implements PipeTransform {

      /**
   * Construct the Access Request component with an Access Request service and a Material Snackbar.
   * 
   * @param {DomSanitizer} sanitized dom sanitizer to display backend html code
   */
  constructor(private sanitized: DomSanitizer) {}

        /**
   * Construct the Access Request component with an Access Request service and a Material Snackbar.
   * 
   * @param {any} value value to be sanitized by the function
   */
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
