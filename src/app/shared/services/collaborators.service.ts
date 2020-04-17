import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollaboratorMeta } from '../models/collaborators.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  fakeBackend = `http://${window.location.hostname}:${window.location.port}/admin`
  collaborators: CollaboratorMeta[];

  constructor(private http: HttpClient) {
    if(environment.testErrorBackend) 
      this.fakeBackend = 'http://idontexist';
  }

  /**
   * Retrieve the list of collaborators
   */
  getCollaborators() {
    return this.http.get(`${this.fakeBackend}/collaborators`).subscribe(
      (response: CollaboratorMeta[]) => {
        this.collaborators = response;
      },
      (error) => {throw Error('ERROR: Unable to retrieve collaborators.')}
    );
  }

  /**
   * Ban collaborator
   * @param id the collaborator id
   */
  banCollaborator(id: string) {
    const body = {
      id: id
    }

     if(environment.testErrors){
       body.id = '-999'
     }
     return this.http.put(`${this.fakeBackend}/collaborators/ban`, body).subscribe(
       () =>{},
       (error) => {throw Error('ERROR: Unable to ban collaborator.')}
     );
  }

  /**
   * Unban one collaborator from the database using the collaborator id.
   * @param id the collaborator id to be banned 
   */
  unbanCollaborator(id: string) {
    const body = {
      id: id
    }

    if(environment.testErrors){
      body.id = '-999'
    }

    return this.http.put(`${this.fakeBackend}/collaborators/unban`, body).subscribe(
      () =>{},
      (error) => {throw Error('ERROR: Unable to unban collaborator.')}
    );
  }
}
