import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config()

const emailConfig = {
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};



async function sendEmail(prop = { data, customerEmail, template }) {

    const { data, customerEmail, template } = prop;

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        to: customerEmail,
        subject: 'Global Trading Cars',
        html: template(data)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully")
        return { data: info, success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { error: error.message || 'Unknown error', success: false };
    }
}


export default sendEmail 
