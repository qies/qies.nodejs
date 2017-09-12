import { AggregateBase  } from "./AggregateBase";
import {EventBase} from "./EventBase";

export interface IEventStore {
    appendStream(aggregate: AggregateBase, event: EventBase): Promise<void>;
}