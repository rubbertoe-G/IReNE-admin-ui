import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';


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
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.showError(message);
      let statusCode = errorService.getServerErrorStatusCode(error);
      if(statusCode === 403)
        this.router.navigate(['/']);
      
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    // Always log errors
    console.error(error);
  }
}