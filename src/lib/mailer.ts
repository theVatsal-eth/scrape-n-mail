import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default async function sendMail(
  mailOptios: Mail.Options,
  callback: (err: Error | null, info: any) => void
) {
  try {
    const res = await transporter.sendMail(mailOptios);
    callback(null, res);
  } catch (error) {
    console.error({ error });
    callback(error as Error, null);
  }
}
