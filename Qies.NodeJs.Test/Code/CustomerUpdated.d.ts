import * as Qies from "qies-nodejs";
import { CustomerAggregate } from "./CustomerAggregate";
export declare class CustomerUpdated extends Qies.EventBase {
    static eventType: string;
    private name;
    constructor(data: any);
    getName(): string;
    static create(customer: CustomerAggregate, name: string): CustomerUpdated;
}
