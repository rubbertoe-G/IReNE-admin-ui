/**
*  Interface that represents the Actor and its fields given by the server.
*/
export interface ActorMeta{
    actor_FN: string;
    actor_LN: string;
    role: string;
  }

/**
*  Interface that represents the revision history of an actor field.
*/
export interface ActorMetaDOC{
  new: Array<ActorMeta>;
  old: Array<ActorMeta>;
}