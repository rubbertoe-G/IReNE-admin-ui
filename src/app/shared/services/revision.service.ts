import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RevisionMeta } from '../models/revision.model';
import { DatePipe } from '@angular/common';
import { CreationMeta } from '../models/creation.model';
import { DescriptionMeta } from '../models/description.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  fakeBackend = environment.backend;

  revisions: RevisionMeta[];
  creationRevision: CreationMeta;
  descriptionRevision: DescriptionMeta;

  constructor(private http: HttpClient,
    private datePipe: DatePipe) {
  }

  getRevisions() {
    /**
     * Get all documents history with their needed data.
     */

     return this.http.get(`${this.fakeBackend}/documents-hist/`).subscribe(
       (response) => {
         this.revisions = response['revision-history'];
       }
     );
  }

  getCreationRevision(docId){
    const formData = new FormData();
    formData.append('index', '0');
    formData.append('revDocId', docId);
    console.log("Here")
    return this.http.post(`${this.fakeBackend}/documents-hist/revision`, formData).subscribe(
      (response: CreationMeta) => {
        this.creationRevision = response['revision']
        this.creationRevision.incidentDate = this.datePipe.transform(response['revision'].incidentDate, 'yyyy-MM-dd');
        this.creationRevision.lastModificationDate = this.datePipe.transform(response['revision'].lastModificationDate, 'yyyy-MM-dd')
        this.creationRevision.creationDate = this.datePipe.transform(response['revision'].creationDate, 'yyyy-MM-dd')
      }
    );
  }

  getDescriptionRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    console.log("Here")
    return this.http.post(`${this.fakeBackend}/documents-hist/revision`, formData).subscribe(
      (response: DescriptionMeta) => {
        this.descriptionRevision = response['revision'];
      }
    );
  }
}