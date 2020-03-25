import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentMeta } from '../models/documents.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  fakeBackend = 'http://localhost:4200/api';

  documents: DocumentMeta[];

  constructor(private http: HttpClient) { }

  getDocuments() {
    /**
     * Get all documents with their needed data.
     */

     return this.http.get(`${this.fakeBackend}/documents`).subscribe(
       (response: DocumentMeta[]) => {
         this.documents = response;
       }
     );
  }

  getDocumentById(id: string) {
    return;
  }

  publishDocument(id: string) {
    /**
     * Set a document to be published.
     */
    const body = {
      id: id
    };

    return this.http.put(`${this.fakeBackend}/documents/publish`, body).subscribe(
      (response) => {
        this.documents.forEach(e => {
          if(e.id === response){
            e.published = true;
          }
        });
      }
    );

  }

  unpublishDocument(id: string) {
    /**
     * Set a document to be unpublished.
     */
    const body = {
      id: id
    };

    return this.http.put(`${this.fakeBackend}/documents/unpublish`, body).subscribe(
      (response) => {
        this.documents.forEach(e => {
          if(e.id === response){
            e.published = false;
          }
        });
      }
    );

  }
}
