/**
*  Interface that represents a tag given by the server.
*/
export interface TagMeta {
    _id: string;
    tagItem: string;
  }

export interface TagMetaDOC{
  new: Array<string>;
  old: Array<string>;
}