import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestMeta } from '../models/access-requests.model';



@Injectable({
  providedIn: 'root'
})
export class AccessRequestsService {

  fakeBackend = 'http://localhost:4200/admin';
  requests: RequestMeta[];

  constructor(private http: HttpClient) { }

  getRequests() {
    /**
     * Get all approved collabroators from the fake server.
     */
    return this.http.get(`${this.fakeBackend}/access-requests`).subscribe(
      (response: RequestMeta[]) => {
        this.requests = response;
      });
  }

  acceptRequest(id: string) {
    /**
     * Accept one access request from the database.
     */

     // TODO: Update the view model on success request.
     const body = {
       requestID: id
     }
     return this.http.put(`${this.fakeBackend}/access-requests/accept`, body);
  }

  denyRequest(id: string) {
    /**
     * Remove one tag from the database.
     */

     // TODO: Update the view model on success request.
     const body = {
       requestID: id
     }
     return this.http.put(`${this.fakeBackend}/access-requests/deny`, body);
  }
}
