import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollaboratorMeta } from '../models/collaborators.model';



@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  fakeBackend = 'http://localhost:4200/api';
  collaborators: CollaboratorMeta[];

  constructor(private http: HttpClient) { }

  getCollaborators() {
    /**
     * Get all approved collabroators from the fake server.
     */
    return this.http.get(`${this.fakeBackend}/collaborators`).subscribe(
      (response: CollaboratorMeta[]) => {
        this.collaborators = response;
      });
  }

  banCollaborator(id: string) {
    /**
     * Ban one collaborator from the database using the collaborator id.
     */

     // TODO: Update the view model on success request.
     const body = {
       collabId: id
     }
     return this.http.put(`${this.fakeBackend}/collaborators/ban`, body).subscribe(
       (response) => {
         this.collaborators.forEach(e => {
           if(e.id === response){
             e.banned = !e.banned;
           }
         });
       },
       (error) => console.log(error)
     );
  }

  unbanCollaborator(id: string) {
    /**
     * Unban one collaborator from the database using the collaborator id.
     *
     * Returns: id of the unbanned banned collaborator after http request is done.
     */
    const body = {
      id: id
    }
    return this.http.put(`${this.fakeBackend}/collaborators/unban`, body).subscribe(
      (response) => {
        this.collaborators.forEach(e => {
          if(e.id === response){
            e.banned = !e.banned;
          }
        });
      }
    );
  }
}