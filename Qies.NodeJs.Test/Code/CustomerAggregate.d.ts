import * as Qies from "qies-nodejs";
export declare class CustomerAggregate extends Qies.AggregateBase {
    private name;
    private birthday;
    constructor(customerId: string);
    getName(): string;
    getBirthday(): string;
    apply(event: Qies.EventBase): void;
}
