require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

exports.forgetPassword = async function (req, res) {
    const user = await Auth.findOne({ email: req.body.email });
    const SECRET_KEY = "secret key for forget password"

    if (!user.email) {
        res.status(404).send("Invalid Email Id!");
    } else {
        const secret = SECRET_KEY + user.password;
        const token = await jwt.sign({ _id: user._id }, secret, {
            expiresIn: "15m"
        });
        const link = `http://localhost:5000/auth/resetPassword/${user._id}/${token}`;
        console.log(link);

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'nodet76@gmail.com',
                pass: 'Qwer@1234',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'nodet76@gmail.com',
            to: user.email,
            subject: "Reset password",
            text: `Hello ${user.firstName}
                 You can reset your password by clicking the link: 
                 ${link}
                 Thank You!`,
            html:
                `<h1>Hello ${user.firstName}</h1>
                <p>Please verify your account by clicking the link:</p>
                <a href="${link}">Click here</a>
                <h4>Thank You!</h4>`
        });

console.log('Email sent!');
        res.send('Email sent!')
    }

}