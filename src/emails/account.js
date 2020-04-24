const sgMail = require("@sendgrid/mail");

const sendgridAPIkey =
  "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";

sgMail.setApiKey(sendgridAPIkey);

sgMail.send({
  to: "mohammadhossein211@gmail.com",
  from: "mohammadhossein311@gmail.com",
  subject: "this is mty first creation",
  text: "I hope this one actuly get to you",
});
