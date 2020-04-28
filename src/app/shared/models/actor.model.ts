export interface ActorMeta{
    actor_FN: string;
    actor_LN: string;
    role: string;
  }

export interface ActorMetaDOC{
  new: ActorMeta;
  old: ActorMeta;
}