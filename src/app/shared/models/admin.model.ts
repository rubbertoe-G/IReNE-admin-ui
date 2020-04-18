/**
*  Interface that represents the admin account currently in use.
*/
export interface AdminMeta {
    username: string;
    password: string;
    token?: string;
}