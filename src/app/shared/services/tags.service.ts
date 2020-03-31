import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagMeta } from '../models/tags.model';



@Injectable({
  providedIn: 'root'
})
export class TagsService {

  fakeBackend = 'http://localhost:4200/admin';
  tags: TagMeta[];

  constructor(private http: HttpClient) { }

  getTags() {
    /**
     * Get all approved collabroators from the fake server.
     */
    return this.http.get(`${this.fakeBackend}/tags`).subscribe(
      (response: TagMeta[]) => {
        this.tags = response;
      });
  }

  removeTag(id: string) {
    /**
     * Remove one tag from the database.
     */

     // TODO: Update the view model on success request.
     const body = {
       tagID: id
     }
     return this.http.put(`${this.fakeBackend}/tags/remove`, body);
  }
}
