
import nodemailer from 'nodemailer'



const MailTranspoter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


MailTranspoter.verify()
  .then(() => { console.log("Email transporter is ready to send emails"); })
  .catch((err) => { console.error("Email transporter verification failed:", err); });



export const sendEmail = async (subject, to, html) => {
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to,
    subject,
    html,
  };

  const details = await MailTranspoter.sendMail(mailOptions);
  console.log("Email sent:", details);
  return "email sent successfully, to " + to;
};