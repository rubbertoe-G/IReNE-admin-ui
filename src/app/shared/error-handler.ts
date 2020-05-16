import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { throwError } from 'rxjs';


/**
 * Handler that manages all the errors that could surface in the system.
*/
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    /**
   * Constructor to initialized the error handler.
   * 
   * @param {Injector} injector injector to use the needed services
   * @param {Router} router router object to manage navigation for error response
   */ 
  constructor(private injector: Injector,
    private router: Router) { }
  
  /**
   * Manages the error and displays them accordingly.
   * 
   * @param {Error | HttpErrorResponse} error snackbar to be dispatched
   */ 
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);
    let message;
    let error_type;
    let statusCode;
    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerErrorMessage(error);
      statusCode = errorService.getServerErrorStatusCode(error);
      error_type = errorService.getServerErrorType(error);
      if(statusCode == 0){
        const service = this.injector.get(AuthenticationService);
        notifier.showError(error_type, "The application was unable to reach the server");
        service.logout();
        this.router.navigate(['/login']);
      }
      else if([401,422].includes(statusCode)){
        const service = this.injector.get(AuthenticationService);
        service.logout();
        this.router.navigate(['/login']);
        if(message =="Token has expired"){
            notifier.showError(error_type, "User session has expired. Please sign in again.");
        }
      }
      else if([400,403,404].includes(statusCode)){
        notifier.showError(error_type, message);
      }
      else{
        notifier.showError(error_type, message);
      }
      
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      //notifier.showError(message);
    }
    // Always log errors
    console.error(error);
  }
}