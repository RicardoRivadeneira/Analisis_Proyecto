// backend/src/listeners/event_created_listener.js
import { eventEmitter } from "../utils/event_emitter.js"
import { sendEmail } from "../services/email.service.js"

const onEventCreated = (event) => {
    console.log(`El eveno ha sido creado:`, event);

    const emailData = {
        to: 'admin@example.com',
        subject: 'Nuevo Evento Creado',
        body: `El evento  "${event.title}" ha sido creado exitosamente.`
    };

    sendEmail(emailData);
};

eventEmitter.subscribe('eventCreated', onEventCreated);
