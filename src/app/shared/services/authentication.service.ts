import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminMeta } from '../models/admin.model';

/**
 * Service that sends the requests needed to the backend server in order to perform the necessary functions required for the Authentication process to work.
*/
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    /**
    * Variable that holds the information of the admin and emits it whenever subscribed to.
    */
    private currentUserSubject: BehaviorSubject<AdminMeta>;

    /**
    * Variable that holds the information as an observable object
    */
    public currentUser: Observable<AdminMeta>;

    /**
     * Variable that holds the ip address of the backend.
     */
    private fakeBackend = 'http://localhost:4200/admin';

    /**
     * Constructor that initializes the current user variables
     * 
     * @param {HttpClient} http client used to perform the requests to the server
     */
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AdminMeta>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Returns the object of the current user
     * @returns {AdminMeta} returns the object that holds the information of the current user
     */
    public get currentUserValue(): AdminMeta {
        return this.currentUserSubject.value;
    }

    /**
     * Function that performs the login procedure
     * @param {string} username username of the admin trying to login
     * @param {string} password password of the admin trying to login
     * @returns {AdminMeta} returns the user account whose username and password belonged to
     */ 
    login(username: string, password: string) {
        return this.http.post<any>(`${this.fakeBackend}/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    /**
     * Function that performs the logout procedure
     */ 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}