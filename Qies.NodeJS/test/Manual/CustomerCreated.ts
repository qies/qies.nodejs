import {EventBase} from "../../src/EventBase";
import { CustomerAggregate } from "./CustomerAggregate";

export class CustomerCreated extends EventBase {

    public static eventType = "CustomerCreated";
    private customerId: string;
    private name: string;
    private birthday: string;

    constructor(data: any) {
        super(CustomerCreated.eventType, data.id);
        this.customerId = data.customerId;
        this.name = data.name;
        this.birthday = data.birthday;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public getBirthday(): string {
        return this.birthday;
    }

    public getName(): string {
        return this.name;
    }

    public static create(customer: CustomerAggregate, name: string, birthday: string) {
        return new CustomerCreated({ customerId: customer.key, name: name, birthday: birthday });
    }
}
