/**
*  Interface that represents a Collaborator and its fields given by the server.
*/
export interface CollaboratorMeta {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  banned: boolean;
}