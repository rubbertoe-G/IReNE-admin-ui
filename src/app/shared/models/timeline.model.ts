/**
*  Interface that represents a timeline object with the fields given by the server.
*/
export interface TimelineEvent{
    event: string;
    eventEndDate: string;
    eventStartDate: string;
}

/**
*  Interface that represents a revision component of type timeline.
*/
export interface TimelineMeta {
    old: Array<TimelineEvent>;
    new: Array<TimelineEvent>;
}