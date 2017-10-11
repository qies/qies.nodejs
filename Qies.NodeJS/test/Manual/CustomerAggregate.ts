import {CustomerCreated} from "./CustomerCreated";
import {CustomerUpdated} from "./CustomerUpdated";

export class CustomerAggregate extends Qies.NodeJs.AggregateBase {

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

    apply(event: Qies.NodeJs.EventBase): void {
        if (event instanceof CustomerCreated) {
            this.name = event.getName();
            this.birthday = event.getBirthday();
        }
        if (event instanceof CustomerUpdated) {
            this.name = event.getName();
        }
    }
}
