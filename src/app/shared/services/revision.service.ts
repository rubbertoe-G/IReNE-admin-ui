import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RevisionMeta } from '../models/revision.model';


@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  fakeBackend = 'http://localhost:5000/admin';

  revisions: RevisionMeta[];

  constructor(private http: HttpClient) {
  }

  getRevisions() {
    /**
     * Get all documents history with their needed data.
     */

     return this.http.get(`${this.fakeBackend}/documents-rev/`).subscribe(
       (response) => {
         this.revisions = response['revision-history'];
       }
     );
  }
}