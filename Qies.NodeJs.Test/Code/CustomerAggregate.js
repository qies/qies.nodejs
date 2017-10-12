"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Qies = require("qies-nodejs");
const CustomerCreated_1 = require("./CustomerCreated");
const CustomerUpdated_1 = require("./CustomerUpdated");
class CustomerAggregate extends Qies.AggregateBase {
    constructor(customerId) {
        super(customerId, "CustomerAggregate");
    }
    getName() {
        return this.name;
    }
    getBirthday() {
        return this.birthday;
    }
    apply(event) {
        if (event instanceof CustomerCreated_1.CustomerCreated) {
            this.name = event.getName();
            this.birthday = event.getBirthday();
        }
        if (event instanceof CustomerUpdated_1.CustomerUpdated) {
            this.name = event.getName();
        }
    }
}
exports.CustomerAggregate = CustomerAggregate;
