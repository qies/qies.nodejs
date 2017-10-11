module Qies.NodeJs {
    export interface IEventStore {
        appendStream(aggregate: AggregateBase, event: EventBase): Promise<void>;
    }
}