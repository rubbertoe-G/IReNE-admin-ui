import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollaboratorMeta } from '../models/collaborators.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  fakeBackend = `http://localhost:5000/admin`
  collaborators: CollaboratorMeta[];

  constructor(private http: HttpClient) {
    if(environment.testErrorBackend) 
      this.fakeBackend = 'http://idontexist';
  }

  /**
   * Retrieve the list of collaborators
   */
  getCollaborators() {
    return this.http.get(`${this.fakeBackend}/collaborators/`).subscribe(
      (response) => {
        this.collaborators = response['collaborators'];
      },
      (error) => {throw Error('ERROR: Unable to retrieve collaborators.')}
    );
  }

  /**
   * Ban collaborator
   * @param id the collaborator id
   */
  banCollaborator(id: string) {
    const formData = new FormData();
    formData.append('collabID', id);

     return this.http.put(`${this.fakeBackend}/collaborators/ban`, formData).subscribe(
       (response) =>{
        console.log(response);
        this.collaborators.forEach(e => {
          if(e._id === response['collaborator']){
            e.banned = true;
          }
        });
       },
       (error) => {throw Error('ERROR: Unable to ban collaborator.')}
     );
  }

  /**
   * Unban one collaborator from the database using the collaborator id.
   * @param id the collaborator id to be banned 
   */
  unbanCollaborator(id: string) {
    const formData = new FormData();
    formData.append('collabID', id);

    return this.http.put(`${this.fakeBackend}/collaborators/unban`, formData).subscribe(
      (response) =>{
        console.log(response);
        this.collaborators.forEach(e => {
          if(e._id === response['collaborator']){
            e.banned = false;
          }
        });
      },
      (error) => {throw Error('ERROR: Unable to unban collaborator.')}
    );
  }
}
