"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const Qies = require("qies-nodejs");
const CustomerCreated_1 = require("./Code/CustomerCreated");
const CustomerUpdated_1 = require("./Code/CustomerUpdated");
const CustomerAggregate_1 = require("./Code/CustomerAggregate");
var readline = require('readline');
class Test {
    constructor() {
        var credentials = new AWS.SharedIniFileCredentials({ profile: 'qtest' });
        AWS.config.credentials = credentials;
        AWS.config.region = "eu-west-1";
        var dynamodb = new AWS.DynamoDB();
        this.eventStore = new Qies.EventStore("QueueEventStore", dynamodb)
            .registerEvent(CustomerCreated_1.CustomerCreated.eventType, CustomerCreated_1.CustomerCreated)
            .registerEvent(CustomerUpdated_1.CustomerUpdated.eventType, CustomerUpdated_1.CustomerUpdated);
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Creating customer 'mala' with name 'Martin Larsen' and birthday 31/03/1980");
                var customer = new CustomerAggregate_1.CustomerAggregate("mala");
                var createdEvent = CustomerCreated_1.CustomerCreated.create(customer, "Martin Larsen", "31/03/1980");
                yield this.eventStore.appendStream(customer, createdEvent);
                console.log("Done creating");
                console.log("Updating name of customer 'mala' to 'Martin Rundberg'");
                var updatedEvent = CustomerUpdated_1.CustomerUpdated.create(customer, "Martin Rundberg");
                yield this.eventStore.appendStream(customer, updatedEvent);
                console.log("Done updating");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var loadedCustomer = new CustomerAggregate_1.CustomerAggregate("mala");
                console.log("Name before replay: " + loadedCustomer.getName());
                console.log("Birthday before replay: " + loadedCustomer.getBirthday());
                yield this.eventStore.replayStream(loadedCustomer);
                console.log("Name after replay: " + loadedCustomer.getName());
                console.log("Birthday after replay: " + loadedCustomer.getBirthday());
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var test = new Test();
test.write().then(() => rl.question("Press enter to replay? ", (answer) => {
    rl.close();
    test.read();
}));
