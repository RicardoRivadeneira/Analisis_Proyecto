// backend/src/utils/event_emitter.js
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        console.log(`Listener subscribed to event: ${event}`);
    }

    unsubscribe(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
        console.log(`Listener unsubscribed from event: ${event}`);
    }

    emit(event, data) {
        if (!this.events[event]) return;

        console.log(`Event emitted: ${event} with data:`, data);
        this.events[event].forEach(listener => listener(data));
    }
}

export const eventEmitter = new EventEmitter();
