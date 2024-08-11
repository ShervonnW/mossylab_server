const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (req, res) => {
    const { fullName, company, email, phone, subject, message } = req.body;

    //构建邮件内容
    const mailContent = 
    `
        Full name: ${fullName}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Subject: ${subject}\n
        ${company ? `Company: ${company}\n` : ''}
        Message: \n
        ${message}
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
      });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,  // 你的接收邮件的邮箱
        subject: `New Contact Submission From Customer - ${subject}`,
        text: mailContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      }

};

module.exports = {
    sendMail
};
