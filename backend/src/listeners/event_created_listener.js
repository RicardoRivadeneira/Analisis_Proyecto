// backend/src/listeners/event_created_listener.js
import { eventEmitter } from "../utils/event_emitter.js"
import fs from 'fs';

const onEventCreated = (event) => {
    console.log(`El evento ha sido creado:`, event);

    // Crear archivo .json con la información del evento
    const eventData = {
        title: event.title,
        description: event.description,
        date: new Date().toISOString()
    };

    fs.writeFileSync(`./logs/event_${Date.now()}.json`, JSON.stringify(eventData, null, 2));
    console.log('El archivo de evento ha sido creado.');
};

eventEmitter.subscribe('eventCreated', onEventCreated);
