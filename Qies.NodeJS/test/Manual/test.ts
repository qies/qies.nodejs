import * as AWS from "aws-sdk";
import {CustomerAggregate} from "./CustomerAggregate";
import {CustomerCreated} from "./CustomerCreated";
import { CustomerUpdated } from "./CustomerUpdated";
var readline = require('readline');

var credentials = new AWS.SharedIniFileCredentials({ profile: 'qtest' });
AWS.config.credentials = credentials;
AWS.config.region = "eu-west-1";
var dynamodb = new AWS.DynamoDB();

var eventStore = new Qies.NodeJs.EventStore("QueueEventStore", dynamodb)
    .registerEvent(CustomerCreated.eventType, CustomerCreated)
    .registerEvent(CustomerUpdated.eventType, CustomerUpdated);

class Test {
    public async write() : Promise<void> {
        try {

            console.log("Creating customer 'mala' with name 'Martin Larsen' and birthday 31/03/1980");
            var customer = new CustomerAggregate("mala");
            var createdEvent = CustomerCreated.create(customer, "Martin Larsen", "31/03/1980");
            await eventStore.appendStream(customer, createdEvent);
            console.log("Done creating");

            console.log("Updating name of customer 'mala' to 'Martin Rundberg'");
            var updatedEvent = CustomerUpdated.create(customer, "Martin Rundberg");
            await eventStore.appendStream(customer, updatedEvent);
            console.log("Done updating");
        } catch (err) {
            console.log(err);
        }
    }

    public async read(): Promise<void> {
        try {
            var loadedCustomer = new CustomerAggregate("mala");
            console.log("Name before replay: " + loadedCustomer.getName());
            console.log("Birthday before replay: " + loadedCustomer.getBirthday());

            await eventStore.replayStream(loadedCustomer);
            console.log("Name after replay: " + loadedCustomer.getName());
            console.log("Birthday after replay: " + loadedCustomer.getBirthday());
        } catch (err) {
            console.log(err);
        }
    }
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var test = new Test();
test.write().then(() => 
    rl.question("Press enter to replay? ", (answer) => {
        rl.close();
        test.read();
    }));
