import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';

/**
* Class that checks the current user and inserts their corresponding JWT token into the request header.
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    /**
   * Constructor for the auth guard component with an Access Request service and a Material Snackbar.
   * 
   * @param {AuthenticationService} authenticationService Angular material snackbar
   */
    constructor(private authenticationService: AuthenticationService) { }

    /**
   * Function that intercepts the http requests in order to add the corresponding JWT interceptor to the request.
   * 
   * @param {HttpRequest<any>} request request currently going to the server
   * @param {HttpHandler} next http handler that manages events
   */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}