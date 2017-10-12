import * as Qies from "qies-nodejs";
import {CustomerCreated} from "./CustomerCreated";
import {CustomerUpdated} from "./CustomerUpdated";

export class CustomerAggregate extends Qies.AggregateBase {

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

    apply(event: Qies.EventBase): void {
        if (event instanceof CustomerCreated) {
            this.name = event.getName();
            this.birthday = event.getBirthday();
        }
        if (event instanceof CustomerUpdated) {
            this.name = event.getName();
        }
    }
}
