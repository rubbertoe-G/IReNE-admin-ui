import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RevisionMeta } from '../models/revision.model';
import { DatePipe } from '@angular/common';
import { CreationMeta } from '../models/creation.model';
import { DescriptionMeta } from '../models/description.model';
import { TitleMeta } from '../models/title.model';
import { TimelineMeta } from '../models/timeline.model';
import { InfrastructureMeta } from '../models/infrastructure.model';
import { DamageMeta } from '../models/damage.model';
import { LocationMeta } from '../models/location.model';
import { TagMeta, TagMetaDOC } from '../models/tags.model';
import { IncidentMeta } from '../models/incident.model';
import { AuthorMetaDOC, AuthorMeta } from '../models/author.model';
import { ActorMetaDOC, ActorMeta } from '../models/actor.model';
import { SectionMetaDOC } from '../models/section.model';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  

  revisions: RevisionMeta[];
  creationRevision: CreationMeta;
  descriptionRevision: DescriptionMeta;
  titleRevision: TitleMeta;
  timelineRevision: TimelineMeta;
  infrastructureRevision: InfrastructureMeta;
  damageRevision: DamageMeta;
  locationRevision: LocationMeta;
  tagRevision: TagMetaDOC;
  incidentRevision: IncidentMeta;
  authorRevision: AuthorMetaDOC;
  actorRevision: ActorMetaDOC;
  sectionRevision: SectionMetaDOC;

  constructor(private http: HttpClient,
    private datePipe: DatePipe) {
  }

  getRevisions() {
    /**
     * Get all documents history with their needed data.
     */

     return this.http.get(`${environment.backend}/documents-hist/`).subscribe(
       (response) => {
         this.revisions = response['revision-history'];
       }
     );
  }


  findRevisions(sortSubject ='revision_date', filter = '', sortOrder = 'desc',
    pageNumber = 0, pageSize = 8):  Observable<Object> {
    const formData = new FormData();
    formData.append('sortField', sortSubject);
    formData.append('filterVal', filter);
    formData.append('sortOrder', sortOrder);
    formData.append('pageNumber', pageNumber.toString());
    formData.append('pageSize', pageSize.toString());
    return this.http.post(`${environment.backend}/documents-hist/`, formData).pipe(
        map(response =>  response)
    );
}

  getCreationRevision(docId){
    const formData = new FormData();
    formData.append('index', '0');
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: CreationMeta) => {
        this.creationRevision = response['revision']['new']
        this.creationRevision.incidentDate = this.datePipe.transform(response['revision']['new'].incidentDate, 'yyyy-MM-dd');
        this.creationRevision.lastModificationDate = this.datePipe.transform(response['revision']['new'].lastModificationDate, 'yyyy-MM-dd')
        this.creationRevision.creationDate = this.datePipe.transform(response['revision']['new'].creationDate, 'yyyy-MM-dd')
      }
    );
  }

  getDescriptionRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: DescriptionMeta) => {
        this.descriptionRevision = response['revision'];
      }
    );
  }

  getTitleRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: TitleMeta) => {
        this.titleRevision = response['revision'];
      }
    );
  }

  getTimelineRev(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: TitleMeta) => {
        this.timelineRevision = response['revision'];
      }
    );
  }


  getInfrastructureRev(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: InfrastructureMeta) => {
        this.infrastructureRevision = response['revision'];
      }
    );
  }

  getDamageRev(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: DamageMeta) => {
        this.damageRevision = response['revision'];
      }
    );
  }

  getLocationRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: LocationMeta) => {
        this.locationRevision = response['revision'];
      }
    );
  }

  getTagRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: TagMeta) => {
        this.tagRevision = response['revision'];
      }
    );
  }
  
  getIncidentRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: IncidentMeta) => {
        this.incidentRevision = response['revision'];
      }
    );
  }

  getAuthorRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: AuthorMetaDOC) => {
        this.authorRevision = response['revision'];
      }
    );
  }

  getActorRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: ActorMetaDOC) => {
        this.actorRevision = response['revision'];
      }
    );
  }
  

  getSectionRevision(docId, index){
    const formData = new FormData();
    formData.append('index', index);
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: SectionMetaDOC) => {
        this.sectionRevision = response['revision'];
      }
    );
  }
  
}

  

