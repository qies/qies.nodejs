import * as AWS from "aws-sdk";
import {EventStore} from "../../src/EventStore";
import {Customer} from "./Customer";
import {CustomerCreated} from "./CustomerCreated";
console.log("test");

var credentials = new AWS.SharedIniFileCredentials({ profile: 'qtest' });
AWS.config.credentials = credentials;
AWS.config.region = "eu-west-1";
var dynamodb = new AWS.DynamoDB();
var eventStore = new EventStore("QueueEventStore", dynamodb)
    .registerEvent(CustomerCreated.eventType, CustomerCreated);

var customer = new Customer("mala");
var createdEvent = CustomerCreated.create(customer, "Martin Larsen");

eventStore.appendStream(customer, createdEvent)
    .then((data) => {
        console.log("done appending");

        var loadedCustomer = new Customer("mala");

        console.log(customer.getStreamId());
        console.log(loadedCustomer.getStreamId());

        eventStore.replayStream(loadedCustomer)
            .then(() => {
                console.log(loadedCustomer.getName());
            });


    })
    .catch((err) => console.log(err));

