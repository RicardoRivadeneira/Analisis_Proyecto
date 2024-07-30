// backend/src/app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fs from 'fs';

// Verificar si la carpeta 'logs' existe, si no, crearla
const logsDirectory = './logs';
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

import { eventRouter } from './routes/event.routes.js';
import { eventCategoryRouter } from './routes/event_category.routes.js';
import { contactFormRouter } from './routes/contact_form.routes.js';
import { userRouter } from './routes/user.routes.js';
import { invoiceRouter } from './routes/invoice.routes.js';
import './listeners/user_created_listener.js';
import './listeners/event_created_listener.js';
import './listeners/event_updated_listener.js'; // Añadido nuevo listener

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // O la URL de tu frontend
}));
app.use(express.json());
app.use(eventRouter);
app.use(eventCategoryRouter);
app.use(contactFormRouter);
app.use(userRouter);
app.use(invoiceRouter);

app.listen(process.env.PORT, () => {
    console.log('EventMetropolis backend initialized');
});
