import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pug from 'pug';
import { NodemailerService } from './nodemailer.service.js';
import { ContactFormModel } from '../models/contact_form.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ContactFormService {
    static #templates = join(__dirname, '../templates/');
    static #assets = join(__dirname, '../assets/');
    static #img = join(this.#assets, 'img/');

    /**
     * @param {ContactFormModel} contactForm 
     */
    static sendContactFormEmail(contactForm) {
        const renderPugData = pug.compileFile(join(this.#templates, 'contact_form.pug'));
        const html = renderPugData(contactForm);

        const logo = 'logo.png';
        NodemailerService.sendMail({
            from: `EventMetropolis <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Formulario de contacto',
            html,
            attachments: [
                {
                    filename: logo,
                    path: join(this.#img, logo),
                    cid: 'logo'
                }
            ]
        });
    }
}
