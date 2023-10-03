import 'dotenv/config';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

/** @param {import('../types/email.type.js').EmailOptions} options */
const sendEmail = async (options) => {
  const { email, subject, template, data } = options;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // More Info: https://medium.com/@iamwebwiz/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d#:~:text=By%20using%20__dirname%20in,defined%20in%20your%20application's%20package.
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(__dirname, '../views', template);

  /**@type {string} */
  const html = await ejs.renderFile(templatePath, data);

  const emailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(emailOptions);
};

export default sendEmail;
