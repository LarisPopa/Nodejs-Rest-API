const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateResetToken = resetToken => {
  const hash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return hash;
};

const sendEmail = options => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });
};

module.exports = {
  generateResetToken,
  sendEmail
};
