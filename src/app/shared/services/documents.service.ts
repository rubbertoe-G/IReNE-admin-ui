import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentMeta } from '../models/documents.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  fakeBackend = 'http://localhost:5000/admin';

  documents: DocumentMeta[];

  constructor(private http: HttpClient) {
    if(environment.testErrorBackend) 
      this.fakeBackend = 'http://idontexist';
  }

  getDocuments() {
    /**
     * Get all documents with their needed data.
     */

     return this.http.get(`${this.fakeBackend}/documents/`).subscribe(
       (response) => {
         this.documents = response['documents'];
       },
       (error) => {throw Error('ERROR: Unable to retrieve documents.');}
     );
  }

  publishDocument(id: string) {
    /**
     * Set a document to be published.
     */
    const formData = new FormData();
    formData.append('docID', id);

    return this.http.put(`${this.fakeBackend}/documents/publish`, formData).subscribe(
      (response) => {
        this.documents.forEach(e => {
          if(e._id === response['docID']){
            e.published = true;
          }
        });
      },
      (error) => {throw Error('ERROR: Unable to publish document.'); }
    );

  }

  unpublishDocument(id: string) {
    /**
     * Set a document to be unpublished.
     */
    const formData = new FormData();
    formData.append('docID', id);

    return this.http.put(`${this.fakeBackend}/documents/unpublish`, formData).subscribe(
      (response) => {
        this.documents.forEach(e => {
          if(e._id === response['docID']){
            e.published = false;
          }
        });
      },
      (error) => {throw Error('ERROR: Unable to unpublish document.');}
    );

  }
}
