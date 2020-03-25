import { Injectable } from '@angular/core';

export interface CollaboratorMeta {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
}

const collaborators: CollaboratorMeta[] = [
  {id: 'aq9zI01ORNE9Okyziblp', firstName: 'Roberto', lastName: 'Guzman', email: 'roberto.guzman3@upr.edu', banned: true},
  {id: '66BuIJ0kNTYPDGz405qb', firstName: 'Yomar', lastName: 'Ruiz', email: 'yomar.ruiz@upr.edu', banned: false},
  {id: 'W0SUHONPhPrkrvL3ruxj', firstName: 'Jainel', lastName: 'Torres', email: 'jainel.torrer@upr.edu', banned: false},
  {id: 'zOHEzUyIKZB3LsAiu2Kb', firstName: 'Alberto', lastName: 'Canela', email: 'alberto.canela@upr.edu', banned: false},
  {id: '9XIu1jT96A5qz1Kpl90R', firstName: 'Alejandro', lastName: 'Vasquez', email: 'alejandro.vasquez@upr.edu', banned: false},
  {id: 'jEFgdhchAjyVhJikg17s', firstName: 'Don', lastName: 'Quijote', email: 'don.quijote@upr.edu', banned: true},
];

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {

  constructor() { }

  getCollaborators() {
    /**
     * Get all approved collabroators from the database.
     */
    return collaborators;
  }

  banCollaborator(id: string) {
    /**
     * Ban one collaborator from the database using the collaborator id.
     */

     // TODO: Update the view model on success request.
    collaborators.forEach(e => {
      if (e.id === id) {
        e.banned = !e.banned;
        return e.id;
      }
    });
  }

  unbanCollaborator(id: string) {
    /**
     * Unban one collaborator from the database using the collaborator id.
     *
     * Returns: id of the unbanned banned collaborator after http request is done.
     */
    collaborators.forEach(e => {
      if (e.id === id) {
        e.banned = !e.banned;
        return e.id;
      }
    });
  }
}
