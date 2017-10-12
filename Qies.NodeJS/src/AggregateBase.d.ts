import { EventBase } from "./EventBase";
export declare abstract class AggregateBase {
    key: string;
    private aggregateType;
    private streamId;
    constructor(key: string, aggregateType: string);
    getAggregateType(): string;
    getStreamId(): string;
    abstract apply(event: EventBase): void;
}
