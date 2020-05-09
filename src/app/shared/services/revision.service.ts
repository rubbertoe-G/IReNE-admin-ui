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

/**
 * Service class in charge of retrieving the document revision history found in the server.
 */
@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  
  /**
   * Field variable that holds all the metadata of the revisions returned by the server.
   */
  revisions: RevisionMeta[];

  /**
   * Field variable that holds all the data of the creation type revision returned by the server.
   */
  creationRevision: CreationMeta;

  /**
   * Field variable that holds all the data of the description type revision returned by the server.
   */
  descriptionRevision: DescriptionMeta;

  /**
   * Field variable that holds all the data of the title type revision returned by the server.
   */
  titleRevision: TitleMeta;

    /**
   * Field variable that holds all the data of the timeline type revision returned by the server.
   */
  timelineRevision: TimelineMeta;

  /**
   * Field variable that holds all the data of the infrastructure type revision returned by the server.
   */
  infrastructureRevision: InfrastructureMeta;

    /**
   * Field variable that holds all the data of the damage type revision returned by the server.
   */
  damageRevision: DamageMeta;

    /**
   * Field variable that holds all the data of the location type revision returned by the server.
   */
  locationRevision: LocationMeta;

    /**
   * Field variable that holds all the data of the tag type revision returned by the server.
   */
  tagRevision: TagMetaDOC;

    /**
   * Field variable that holds all the data of the incident type revision returned by the server.
   */
  incidentRevision: IncidentMeta;

    /**
   * Field variable that holds all the data of the author type revision returned by the server.
   */
  authorRevision: AuthorMetaDOC;

    /**
   * Field variable that holds all the data of the actor type revision returned by the server.
   */
  actorRevision: ActorMetaDOC;

    /**
   * Field variable that holds all the data of the section type revision returned by the server.
   */
  sectionRevision: SectionMetaDOC;

    /**
   * Constructor to initialize the server.
   * @param {HttpClient} http object used to make requests to the server
   * @param {DatePipe} datePipe object used to make the necessary changes to the date given by the server
   */
  constructor(private http: HttpClient,
    private datePipe: DatePipe) {
  }

  /**
   * Get all documents history with their needed data.
   */
  getRevisions() {
     return this.http.get(`${environment.backend}/documents-hist/`).subscribe(
       (response) => {
         this.revisions = response['revision-history'];
       }
     );
  }

  /**
   * Get all documents history with their needed data.
   */
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

  /**
   * Returns the creation revision object that matched the revision document id.
   * @param docId document id of the creation object to be searched in the database
   * @returns {CreationMeta} creation object that matched the id
   */
  getCreationRevision(docId){
    const formData = new FormData();
    formData.append('index', '0');
    formData.append('revDocId', docId);
    return this.http.post(`${environment.backend}/documents-hist/revision`, formData).subscribe(
      (response: CreationMeta) => {
        this.creationRevision = response['revision']['new'];
        this.creationRevision.incidentDate = this.datePipe.transform(response['revision']['new'].incidentDate, 'yyyy-MM-dd');
        this.creationRevision.lastModificationDate = this.datePipe.transform(response['revision']['new'].lastModificationDate, 'yyyy-MM-dd');
        this.creationRevision.creationDate = this.datePipe.transform(response['revision']['new'].creationDate, 'yyyy-MM-dd');
      }
    );
  }

    /**
   * Returns the description revision object that matched the revision document id.
   * @param docId document id of the description object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {DescriptionMeta} description object that matched the id
   */
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

    /**
   * Returns the title revision object that matched the revision document id.
   * @param docId document id of the title object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {TitleMeta} title object that matched the id
   */
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

      /**
   * Returns the timeline revision object that matched the revision document id.
   * @param docId document id of the timeline object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {TitleMeta} timeline object that matched the id
   */
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

      /**
   * Returns the infrastructure revision object that matched the revision document id.
   * @param docId document id of the infrastructure object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {InfrastructureMeta} infrastructure object that matched the id
   */
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

  /**
   * Returns the damage revision object that matched the revision document id.
   * @param docId document id of the damage object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {DamageMeta} damage object that matched the id
   */
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

    /**
   * Returns the location revision object that matched the revision document id.
   * @param docId document id of the location object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {LocationMeta} location object that matched the id
   */
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

  /**
   * Returns the tag revision object that matched the revision document id.
   * @param docId document id of the tag object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {TagMeta} tag object that matched the id
   */
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
  
    /**
   * Returns the incident revision object that matched the revision document id.
   * @param docId document id of the incident object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {IncidentMeta} incident object that matched the id
   */
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

      /**
   * Returns the author revision object that matched the revision document id.
   * @param docId document id of the author object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {AuthorMetaDOC} author object that matched the id
   */
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

      /**
   * Returns the actor revision object that matched the revision document id.
   * @param docId document id of the actor object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {ActorMetaDOC} actor object that matched the id
   */
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
  
      /**
   * Returns the section revision object that matched the revision document id.
   * @param docId document id of the section object to be searched in the database
   * @param index revision number of the revision to be returned
   * @returns {SectionMetaDOC} section object that matched the id
   */
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

  

