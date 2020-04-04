const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

// const exampleHTMLEmail = `<div>` + `<h1>Hello Email</h1>` + `</div>`;

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'leo@wyncode.co',
    subject: 'Thanks for signing up.',
    text: `Hi ${name}! Welcome to your task manager api.`
    // html: exampleHTMLEmail
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'leo@wyncode.co',
    subject: 'Sorry to see you go.',
    text: `Bye ${name}. If you change your mind let us know.`
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
