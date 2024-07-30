// backend/src/listeners/user_created_listener.js
import { eventEmitter } from "../utils/event_emitter.js"
import { sendEmail } from "../services/email.service.js"

const onUserCreated = (user) => {
    console.log(`El usuario ha creado un evento:`, user);

    const emailData = {
        to: user.email,
        subject: 'Bienvenido a nuestra plataforma',
        body: 'Gracias por registrarte :)'
    };

    sendEmail(emailData);
};

eventEmitter.subscribe('userCreated', onUserCreated);
