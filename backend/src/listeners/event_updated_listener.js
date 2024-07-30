// backend/src/listeners/event_updated_listener.js
import { eventEmitter } from "../utils/event_emitter.js";
import fs from 'fs';

const onEventUpdated = (event) => {
    console.log(`El evento ha sido actualizado:`, event);

    // Crear archivo .json con la información del evento actualizado
    const eventData = {
        id: event.id,
        title: event.title,
        description: event.description,
        date: new Date().toISOString(),
        updated: new Date().toISOString() // Se agrega la fecha de actualización
    };

    fs.writeFileSync(`./logs/event_updated_${Date.now()}.json`, JSON.stringify(eventData, null, 2));
    console.log('El archivo de evento actualizado ha sido creado.');
};

eventEmitter.subscribe('eventUpdated', onEventUpdated);
