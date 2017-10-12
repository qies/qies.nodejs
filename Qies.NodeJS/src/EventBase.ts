const uuidv4 = require('uuid/v4');

export abstract class EventBase {
    constructor(private eventType, private id: string = null) {
        if (!id)
            this.id = uuidv4();
    }

    public getId() {
        return this.id;
    }

    public getEventType() {
        return this.eventType;
    }
}