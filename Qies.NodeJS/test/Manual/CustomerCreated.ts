import {EventBase} from "../../src/EventBase";
import {Customer} from "./Customer";

export class CustomerCreated extends EventBase {

    public static eventType = "CustomerCreated";
    private customerId: string;
    private name: string;

    constructor(data: any) {
        super(CustomerCreated.eventType);
        this.customerId = data.customerId;
        this.name = data.name;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public getName(): string {
        return this.name;
    }

    public static create(customer: Customer, name: string) {
        return new CustomerCreated({ customerId: customer.key, name: name });
    }
}
