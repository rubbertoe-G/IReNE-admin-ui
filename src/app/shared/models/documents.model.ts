import { AuthorMeta } from './author.model';
import { ActorMeta } from './actor.model';
import { SectionMeta } from './section.model';

export interface DocumentMeta {
  _id: string;
  title: string;
  creator: string;
  published: boolean;
}


export interface Document {
  _id?: string;
  title: string;
  description: string;
  creatorFullName: string;
  creatorEmail: string;
  creationDate: string;
  lastModificationDate: string;
  incidentDate: string;
  infrasDocList: Array<string>;
  damageDocList: Array<string>;
  tagsDoc: Array<string>;
  author: Array<AuthorMeta>;
  actor: Array<ActorMeta>;
  section: Array<SectionMeta>;
}
