export declare abstract class EventBase {
    private eventType;
    private id;
    constructor(eventType: any, id?: string);
    getId(): string;
    getEventType(): any;
}
