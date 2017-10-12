"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Qies = require("qies-nodejs");
class CustomerUpdated extends Qies.EventBase {
    constructor(data) {
        super(CustomerUpdated.eventType, data.id);
        this.name = data.name;
    }
    getName() {
        return this.name;
    }
    static create(customer, name) {
        return new CustomerUpdated({ name: name });
    }
}
CustomerUpdated.eventType = "CustomerUpdated";
exports.CustomerUpdated = CustomerUpdated;
