import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentMeta } from '../models/documents.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  fakeBackend = environment.backend;

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
         let docs: DocumentMeta[] = response['documents'];
         this.documents = docs;
       }
     );
  }

  publishDocument(id: string) {
    /**
     * Set a document to be published.
     */
    const formData = new FormData();
    formData.append('docID', id);

    return this.http.put(`${this.fakeBackend}/documents/publish`, formData).subscribe(
      (response: DocumentMeta) => {
        this.documents.forEach(e => {
          if(e._id === response['docID']){
            e.published = true;
          }
        });
      },
      (error) =>{
        Error('ERROR: Unable to change document status.')
      }
    );

  }

  /**
   * Unpublish a specific document.
   * @param id document identification number
   */
  unpublishDocument(id: string) {
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
      (error) =>{
        Error('ERROR: Unable to change document status.')
      }
    );

  }
}
