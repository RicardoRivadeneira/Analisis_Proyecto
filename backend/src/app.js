// backend/src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { eventRouter } from './routes/event.routes.js';
import { eventCategoryRouter } from './routes/event_category.routes.js';
import { contactFormRouter } from './routes/contact_form.routes.js';
import { userRouter } from './routes/user.routes.js';
import { invoiceRouter } from './routes/invoice.routes.js';
import './listeners/user_created_listener.js';
import './listeners/event_created_listener.js';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const app = express();

app.use(cors());
app.use(express.json());
app.use(eventRouter);
app.use(eventCategoryRouter);
app.use(contactFormRouter);
app.use(userRouter);
app.use(invoiceRouter);

app.listen(process.env.PORT, () => {
    console.log('EventMetropolis backend initialized');
});
