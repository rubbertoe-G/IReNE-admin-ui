/**
*  Interface that represents a revision component of type infrasttructure.
*/
export interface InfrastructureMeta{
    new: Array<string>;
    old: Array<string>;
}