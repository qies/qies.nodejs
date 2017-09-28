import {AggregateBase} from "../../src/AggregateBase";
import * as EventBase from "../../src/EventBase";
import {CustomerCreated} from "./CustomerCreated";
import {CustomerUpdated} from "./CustomerUpdated";

export class CustomerAggregate extends AggregateBase {

    private name: string;
    private birthday: string;

    constructor(customerId: string) {
        super(customerId, "CustomerAggregate");
    }

    public getName() {
        return this.name;
    }

    public getBirthday() {
        return this.birthday;
    }

    apply(event: EventBase.EventBase): void {
        if (event instanceof CustomerCreated) {
            this.name = event.getName();
            this.birthday = event.getBirthday();
        }
        if (event instanceof CustomerUpdated) {
            this.name = event.getName();
        }
    }
}
