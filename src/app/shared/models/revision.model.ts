/**
*  Interface that represents the metadata of a revision history item.
*/
export interface RevisionMeta {
    _id: string;
    revision_date: string;
    document_title: string;
    creator_name: string;
    revision_type: string;
    revision_number: number;
    creator_email: string;
  }