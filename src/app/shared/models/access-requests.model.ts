/**
*  Interface that represents the access requests objects given by the server.
*/
export interface RequestMeta {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  banned: boolean;
  approved: boolean;
}