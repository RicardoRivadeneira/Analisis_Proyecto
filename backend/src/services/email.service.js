// backend/src/services/email.service.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async ({ to, subject, body }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('El Email fue enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el email:', error);
    }
};
