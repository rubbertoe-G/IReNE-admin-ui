import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentMeta } from '../models/documents.model';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {


  documents: DocumentMeta[];

  constructor(private http: HttpClient) { }

  /**
   * Get all documents from the database.
   * @returns Observable object that contains a list of DocumentMeta values.
   */
  getDocuments(): Subscription {
    return this.http.get(`${environment.backend}/documents/`).subscribe(
      (response) => {
        let docs: DocumentMeta[] = response['documents'];
        this.documents = docs;
      }
    );
  }

  /**
   * Perform HTTP PUT request to set the status of a document as published.
   * 
   * @param id the id of the document to publish.
   */
  publishDocument(id: string): Subscription {
    const formData = new FormData();
    formData.append('docID', id);

    return this.http.put(`${environment.backend}/documents/publish`, formData).subscribe(
      (response: DocumentMeta) => {
        this.documents.forEach(e => {
          if (e._id === response['docID']) {
            e.published = true;
          }
        });
      },
      (error) => {
        Error('ERROR: Unable to change document status.')
      }
    );

  }

  /**
   * Perform HTTP PUT request to set the status of a document as unpublished.
   * @param id document identification number
   */
  unpublishDocument(id: string): Subscription {
    const formData = new FormData();
    formData.append('docID', id);

    return this.http.put(`${environment.backend}/documents/unpublish`, formData).subscribe(
      (response) => {
        this.documents.forEach(e => {
          if (e._id === response['docID']) {
            e.published = false;
          }
        });
      },
      (error) => {
        Error('ERROR: Unable to change document status.')
      }
    );

  }
}
