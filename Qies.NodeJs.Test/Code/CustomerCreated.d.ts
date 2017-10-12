import * as Qies from "qies-nodejs";
import { CustomerAggregate } from "./CustomerAggregate";
export declare class CustomerCreated extends Qies.EventBase {
    static eventType: string;
    private customerId;
    private name;
    private birthday;
    constructor(data: any);
    getCustomerId(): string;
    getBirthday(): string;
    getName(): string;
    static create(customer: CustomerAggregate, name: string, birthday: string): CustomerCreated;
}
