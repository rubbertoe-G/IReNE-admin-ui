/**
*  Interface that represents a section given by the server.
*/
export interface SectionMeta{
    secTitle: string;
    content: string;
}

/**
*  Interface that represents a revision component of type section.
*/
export interface SectionMetaDOC{
    new: any;
    old: any;
  }
  