/**
 * @ignore
 */
export interface Rev{
    revDate: string;
    revType: string;
    fields: object;
}

/**
 * @ignore
 */
export interface Hist{
    _id: string;
    creatorId: string;
    docId: string;
    revisions: Array<Rev>;
}