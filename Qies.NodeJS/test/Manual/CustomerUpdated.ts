import { EventBase } from "../../src/EventBase";
import { CustomerAggregate } from "./CustomerAggregate";

export class CustomerUpdated extends EventBase {

    public static eventType = "CustomerUpdated";
    private name: string;

    constructor(data: any) {
        super(CustomerUpdated.eventType, data.id);
        this.name = data.name;
    }

    public getName(): string {
        return this.name;
    }

    public static create(customer: CustomerAggregate, name: string) {
        return new CustomerUpdated({ name: name });
    }
}
