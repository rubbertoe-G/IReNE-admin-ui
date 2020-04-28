export interface TimelineEvent{
    event: string;
    eventEndDate: string;
    eventStartDate: string;
}
export interface TimelineMeta {
    old: Array<TimelineEvent>;
    new: Array<TimelineEvent>;
}