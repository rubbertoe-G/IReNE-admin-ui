export interface AuthorMeta{
    author_FN: string;
    author_LN: string;
    author_email: string;
    author_faculty: string;
  }

export interface AuthorMetaDOC{
  new: AuthorMeta;
  old: AuthorMeta;
}