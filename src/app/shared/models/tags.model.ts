/**
*  Interface that represents a tag given by the server.
*/
export interface TagMeta {
    _id: string;
    tagItem: string;
  }

  /**
*  Interface that represents a revision component of type tag.
*/
export interface TagMetaDOC{
  new: Array<string>;
  old: Array<string>;
}