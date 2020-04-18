/**
*  Interface that represents the access requests objects given by the server.
*/
export interface RequestMeta {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
  approved: boolean;
}