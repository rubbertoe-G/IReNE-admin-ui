import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { tokenName } from '@angular/compiler';
import { NotificationService } from '../services/notification.service';

/**
*  Class that manages the operations to check if a user has a valid token to access a path. The class implements the intergace CanActivate.
*/
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    /**
   * Constructor for the auth guard component with an Access Request service and a Material Snackbar.
   * 
   * @param {Router} router router access to the class to implement navigation capabilities
   * @param {AuthenticationService} authenticationService Service that implements the authentication with the backend server
   */
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private injector: Injector
    ) {}

    /**
   * Function that performs the authentication with the user in order to know if the user can access a specific url.
   * 
   * @param {ActivatedRouteSnapshot} route Snapshot of the route that the user wants to access
   * @param {RouterStateSnapshot} state Snapshot of the state of the router when the user wants to access the route
   */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            var time = new Date().getTime();
            var parts = currentUser.token.split('.');
            var tokenized =  JSON.parse(atob(parts[1]));
            var tokenTime = new Date(tokenized.exp*1000).getTime();
            if(time<tokenTime)
                return true;
            else{
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                const notificationService = this.injector.get(NotificationService);
                notificationService.showError("Authentication Error", "User session has expired. Please sign in again.");
                return false;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}