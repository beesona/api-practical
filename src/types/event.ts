import * as deep from 'deep-diff';
export interface IEvent {
    readonly namespace?: Namespace;
    payload?: any;
}

enum Namespace {
    XXXCreated = 'QUASAR.XXX.CREATED',
    XXXUpdated = 'QUASAR.XXX.UPDATED',
    XXXDeleted = 'QUASAR.XXX.DELETED',
    XXXStartup = 'QUASAR.XXX.STARTUP',
}

export class Event implements IEvent {
    payload?: any;

    constructor(payload?: any) {
        this.payload = payload;
    }
}

export class StartEvent extends Event {
    namespace = Namespace.XXXStartup;
    constructor(payload: any) {
        super(payload);
    }
}

export class XXXCreatedEvent extends Event {
    namespace = Namespace.XXXCreated;
    constructor(payload: any) {
        super(payload);
    }
}

export class XXXUpdatedEvent extends Event {
    namespace = Namespace.XXXUpdated;
    payload?: any;

    constructor(oldData: any, updatedData: any) {
        super({});
        this.payload.oldData = oldData;
        this.payload.updatedData = updatedData;
        this.payload.delta = deep.diff(oldData, updatedData);
    }
}

export class XXXDeletedEvent extends Event {
    namespace = Namespace.XXXDeleted;
    constructor(payload: any) {
        super(payload);
    }
}
