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

class InstanceLoader {
    constructor(private context: Object) {

    }

    getInstance(name: string, ...args: any[]) {
        var instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
}

export class GenericEvent extends EventBase {
    
}