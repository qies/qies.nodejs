module Qies.NodeJs {
    export class EventStore implements IEventStore {

        private registeredEvents = new Map<string, new (data: any) => EventBase>();

        constructor(
            private tableName: string,
            private dynamodb: AWS.DynamoDB) {
        }

        public registerEvent<T extends EventBase>(eventType: string, c: new (data: any) => T): EventStore {
            this.registeredEvents.set(eventType, c);
            return this;
        }

        public async appendStream(aggregate: AggregateBase, event: EventBase): Promise<void> {
            let params = {
                ExpressionAttributeNames: {
                    "#Id": "Id",
                    "#StreamId": "StreamId",
                    "#Key": "Key",
                    "#AggregateType": "AggregateType",
                    "#EventType": "EventType",
                    "#EventData": "EventData"
                },
                ExpressionAttributeValues: {
                    ":StreamId": {
                        S: aggregate.getStreamId()
                    },
                    ":Key": {
                        S: aggregate.key
                    },
                    ":AggregateType": {
                        S: aggregate.getAggregateType()
                    },
                    ":EventType": {
                        S: event.getEventType()
                    },
                    ":EventData": {
                        S: JSON.stringify(event)
                    }
                },
                UpdateExpression:
                    "SET #StreamId = :StreamId, #Key = :Key, #AggregateType = :AggregateType, #EventType = :EventType, #EventData = :EventData",
                Key: {
                    "Id": {
                        S: event.getId()
                    }
                },
                TableName: this.tableName,
                ReturnValues: 'NONE',
                ConditionExpression: "attribute_not_exists(#Id)"
            } as AWS.DynamoDB.UpdateItemInput;
            try {
                await this.dynamodb.updateItem(params).promise();
                aggregate.apply(event);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }

        public async replayStream(aggregate: AggregateBase): Promise<void> {

            let params = {
                ConsistentRead: false,
                ExpressionAttributeValues: {
                    ":streamId": {
                        S: aggregate.getStreamId()
                    }
                },
                KeyConditionExpression: "StreamId = :streamId",
                TableName: this.tableName,
                IndexName: "Stream-index",
                Select: "ALL_ATTRIBUTES"
            } as AWS.DynamoDB.QueryInput;

            try {
                do {
                    let response = await this.dynamodb.query(params).promise();
                    response.Items.forEach((item) => {
                        var eventType = item["EventType"].S;
                        var eventData = JSON.parse(item["EventData"].S);
                        aggregate.apply(this.deserialize(eventType, eventData));
                    });

                    params.ExclusiveStartKey = response.LastEvaluatedKey;
                } while (params.ExclusiveStartKey)
            } catch (err) {
                console.log(err);
            }
        }

        public deserialize(eventType: string, data: any): EventBase {
            let factory = this.registeredEvents.get(eventType);
            return new factory(data);
        }
    }
}    