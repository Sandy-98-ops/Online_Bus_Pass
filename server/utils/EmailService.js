import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendWelcomeEmail = (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Thanks For Registering!',
        text: `Hello ${userName},\n\nThank you for registering! We are excited to have you on board.
        \n\nBest regards,\nSandesh Patil`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


export const sendForgotPasswordEmail = (userEmail, userName, password) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Forgot Password!',
        text: `Hello ${userName},\n\nUse below password to login. \n\n ${password}.
        \n\nBest regards,\nKSRTC`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export const sendInstituteRejected = (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Institute Rejected',
        text: `Hello ${userName},\n\nYour Application is rejected by the Depo \n\nBest regards,\nKSRTC`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export const sendInstituteApproved = (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Institute Approved',
        text: `Hello ${userName},\n\nYour Application is Approve by the Depo. Now you can login to the portal \n\nBest regards,\nKSRTC`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
