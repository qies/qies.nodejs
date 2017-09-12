import {EventBase} from "./EventBase";
const uuidv5 = require('uuid/v5');
var namespace = "a8f10200-afbb-478f-90f1-36fe0d2339cf";
export abstract class AggregateBase {
    private streamId: string;

    constructor(public key: string, private aggregateType: string) {
        this.streamId = uuidv5(aggregateType + ':::' + key, namespace);
    }

    public getAggregateType() {
        return this.aggregateType;
    }

    public getStreamId() {
        return this.streamId;
    }
    public abstract apply(event: EventBase): void;
}