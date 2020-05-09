/**
*  Interface that represents the Author and its fields given by the server.
*/
export interface AuthorMeta{
    author_FN: string;
    author_LN: string;
    author_email: string;
    author_faculty: string;
  }

  /**
*  Interface that represents the revision history of an author field.
*/
export interface AuthorMetaDOC{
  new: Array<AuthorMeta>;
  old: Array<AuthorMeta>;
}