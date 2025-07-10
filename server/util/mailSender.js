const nodemailer = require('nodemailer');
require('dotenv').config();
const emailTemplate = require('../emailTemplate');

const mailsender = async (email, title, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'Ecommerce Team <',
            to: email,
            subject: title,
            html: emailTemplate(otp),
        });

        // console.log(info);
    } catch (e) {
        console.log("In Utils", e.message);
    }
}

module.exports = mailsender;
