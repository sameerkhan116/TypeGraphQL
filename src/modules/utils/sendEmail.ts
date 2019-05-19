import * as nodemailer from 'nodemailer';
import { TestAccount } from 'nodemailer';

export async function sendEmail(email: string, url: string) {
    // Generate test account
    const { user, pass }: TestAccount = await nodemailer.createTestAccount();
    // Reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user,
            pass
        }
    });
    // setup email data
    const mailOptions = {
        from: '"Sameer Khan" <sameerkhan7494@gmail.com>',
        to: email,
        subject: "Hello",
        text: "Hey",
        html: `<a href=${url}>Click here to activate</a>`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info.messageId);
    console.log(nodemailer.getTestMessageUrl(info));
}