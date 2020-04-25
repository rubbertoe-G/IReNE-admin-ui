import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

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
        private authenticationService: AuthenticationService
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
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}