"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Qies = require("qies-nodejs");
class CustomerCreated extends Qies.EventBase {
    constructor(data) {
        super(CustomerCreated.eventType, data.id);
        this.customerId = data.customerId;
        this.name = data.name;
        this.birthday = data.birthday;
    }
    getCustomerId() {
        return this.customerId;
    }
    getBirthday() {
        return this.birthday;
    }
    getName() {
        return this.name;
    }
    static create(customer, name, birthday) {
        return new CustomerCreated({ customerId: customer.key, name: name, birthday: birthday });
    }
}
CustomerCreated.eventType = "CustomerCreated";
exports.CustomerCreated = CustomerCreated;
