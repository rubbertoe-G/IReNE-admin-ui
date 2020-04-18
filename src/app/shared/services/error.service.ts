import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
* Service that manages the different error messages that could potentially happen during the execution of the server.
*/
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /**
   * Returns the client error message of the parameter given, if no error message exists, the whole error object is sent as a string.
   * 
   * @param {Error} error error object to be evaluated
   * @returns {string} custom error message
   */
  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
  }

    /**
   * Returns the server error message of the parameter given, if no error message exists, the whole error object is sent as a string.
   * 
   * @param {Error} error error object to be evaluated
   * @returns {string} custom error message
   */
  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?    
           error.statusText :
           'No Internet Connection';
  }
  
    /**
   * Returns the server Status code of the parameter given.
   * 
   * @param {HttpErrorResponse} error error object to be evaluated
   * @returns {number} error status code
   */
  getServerErrorStatusCode(error: HttpErrorResponse): number{
      return error.status;
  }
  
}