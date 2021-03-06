import { AuthorMeta } from './author.model';
import { ActorMeta } from './actor.model';
import { SectionMeta } from './section.model';
import { TimelineMeta } from './timeline.model';

/**
*  Interface that represents a revision component of type Creation.
*/
export interface CreationMeta{
    creatoriD: string;
    title: string;
    language: string;
    location: Array<string>;
    description: string;
    published: boolean;
    incidentDate: string;
    creationDate: string;
    lastModificationDate: string;
    tagsDoc: Array<string>;
    infrasDocList: Array<string>;
    damageDocList: Array<string>;
    author: Array<AuthorMeta>;
    actor: Array<ActorMeta>;
    section: Array<SectionMeta>;
    timeline: Array<TimelineMeta>;
  }