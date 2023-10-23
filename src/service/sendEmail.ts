import nodemailer from "nodemailer";
import { EmailData } from "./email";

export async function sendEmail({ subject, from, message }: EmailData) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.AUTH_USER, // generated ethereal user
      pass: process.env.AUTH_PASS, // generated ethereal password
    },
  });

  const maillData = {
    to: process.env.AUTH_USER,
    subject: `[PLANT] ${subject}`,
    from,
    html: `
          <h1>${subject}</h1>
          <div>${message}</div>
          <br />
          <p>보낸사람: ${from}</p>
        `,
  };

  return transporter.sendMail(maillData);
}
