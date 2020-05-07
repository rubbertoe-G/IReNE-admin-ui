import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestMeta } from '../models/access-requests.model';
import {environment} from '../../../environments/environment';

/**
 * Service that sends the requests needed to the backend server in order to perform the necessary functions required for the Access Request module.
*/
@Injectable({
  providedIn: 'root'
})
export class AccessRequestsService {

  /**
  * Variable that holds the ip address of the backend.
  */
  fakeBackend = environment.backend;

  /**
  * Variable that holds the access requests sent by the server,
  */
  requests: RequestMeta[];

   /**
   * Constructor for the service.
   * 
   * @param {HttpClient} http client used to perform the requests to the server
   */
  constructor(private http: HttpClient) { }

    /**
   * Gets all unapproved collabroators from the server.
   */
  getRequests() {
    return this.http.get(`${this.fakeBackend}/access-requests/`).subscribe(
      (response) => {
        this.requests = response['requests'];
      });
  }

  /**
   * Accepts one access request by sending the request to the backend server.
   * @param {string} id Identifier of the access request to be accepted
   */
  acceptRequest(id: string, password: string) {
    const formData = new FormData();
    formData.append('collabID', id);
    formData.append('password', password);
    return this.http.put(`${this.fakeBackend}/access-requests/approve`, formData);
  }

   /**
   * Denies one access request by sending the request to the backend server.
   * @param {string} id Identifier of the access request to be denied
   */
  denyRequest(id: string, password: string) {
    const formData = new FormData();
    formData.append('collabID', id);
    formData.append('password', password);
    return this.http.put(`${this.fakeBackend}/access-requests/deny`, formData);
  }
}
