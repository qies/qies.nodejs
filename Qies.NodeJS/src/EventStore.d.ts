import * as AWS from "aws-sdk";
import { IEventStore } from "./IEventStore";
import { EventBase } from "./EventBase";
import { AggregateBase } from "./AggregateBase";
export declare class EventStore implements IEventStore {
    private tableName;
    private dynamodb;
    private registeredEvents;
    constructor(tableName: string, dynamodb: AWS.DynamoDB);
    registerEvent<T extends EventBase>(eventType: string, c: new (data: any) => T): EventStore;
    appendStream(aggregate: AggregateBase, event: EventBase): Promise<void>;
    replayStream(aggregate: AggregateBase): Promise<void>;
    deserialize(eventType: string, data: any): EventBase;
}
