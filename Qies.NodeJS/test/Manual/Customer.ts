import {AggregateBase} from "../../src/AggregateBase";
import * as EventBase from "../../src/EventBase";
import {CustomerCreated} from "./CustomerCreated";

export class Customer extends AggregateBase {

    private name: string;

    constructor(customerId: string) {
        super(customerId, "TestAggregate");
    }

    public getName() {
        return this.name;
    }

    apply(event: EventBase.EventBase): void {
        if (event instanceof CustomerCreated) {
            this.name = event.getName();
        }
    }
}
