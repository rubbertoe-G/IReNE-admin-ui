import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagMeta } from '../models/tags.model';
import {environment} from '../../../environments/environment';


/**
 * Service that sends the requests needed to the backend server in order to perform the necessary functions required for the Tags function to work.
*/
@Injectable({
  providedIn: 'root'
})
export class TagsService {

/**
 * Backend ip address
*/
  fakeBackend = environment.backend;

  /**
  * Variable to hold the tags received by the backend.
  */
  tags: TagMeta[];
    
  /**
   * Initializes the necessary objects for the tags to work
   * @param {HttpClient} http client needed to perform the requests
   */ 
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all the tags currently in the database and returns them to the caller.
   * @returns {TagMeta[]} array of tags currently in the database
   */ 
  getTags() {
    /**
     * Get all approved collabroators from the fake server.
     */
    return this.http.get(`${this.fakeBackend}/tags/`).subscribe(
      (response) => {
        this.tags = response['tags'];
      });
  }

  /**
   * Remove a tag currently in the database.
   * @returns {Observable} observable object with the response from the server
   */ 
  removeTag(id: string, password: string) {
    const formData = new FormData();
    formData.append('tagID', id);
    formData.append('password', password);
    return this.http.put(`${this.fakeBackend}/tags/remove`, formData);
  }
}
