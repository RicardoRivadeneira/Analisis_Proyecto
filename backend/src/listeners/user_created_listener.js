// backend/src/listeners/user_created_listener.js
import { eventEmitter } from "../utils/event_emitter.js"
import fs from 'fs';

const onUserCreated = (user) => {
    console.log(`El usuario ha sido creado:`, user);

    // Crear archivo .json con la información del usuario
    const userData = {
        name: user.name,
        email: user.email,
        date: new Date().toISOString()
    };

    fs.writeFileSync(`./logs/user_${Date.now()}.json`, JSON.stringify(userData, null, 2));
    console.log('El archivo de usuario ha sido creado.');
};

eventEmitter.subscribe('userCreated', onUserCreated);
