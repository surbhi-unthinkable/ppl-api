var AuthModel = require("../models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// const mongoose = require("mongoose");

exports.register = async function (req, res) {
    try {
        console.log("test")
        const {
            firstName, lastName, email, dob, phoneNumber, password, confirmPassword
        } = req.body;


        if (password != confirmPassword) {
            res.send("Password not matching!");
            return;
        }

        const user = new AuthModel({
            firstName,
            lastName,
            email,
            dob,
            phoneNumber,
            password,
            confirmPassword
        });

        const token = await user.generateAuthToken();
        console.log("token part", token);

        const API_KEY = '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';
        sgMail.setApiKey(API_KEY);

        const message = {
            to: user.email,
            from: {
                name: 'Node test',
                email: 'nodet76@gmail.com'
            },
            subject: 'Account Verification',
            text: `Hello ${user.firstName}
            Please verify your account by clicking the link: 
            http://${req.headers.host}/auth/confirmation/${token}
            Thank You!`,
            html:
            `<h1>Hello ${user.firstName}</h1>
            <p>Please verify your account by clicking the link:</p>
            <a href="http://${req.headers.host}/auth/confirmation/${token}">Click here</a>
            <h4>Thank You!</h4>`
        }

        sgMail.send(message)
        .then((res) => console.log('Email sent!'))
        .catch((err) => console.log(err))

        // const token = await user.generateAuthToken();
        // console.log("token part", token);

        // console.log('Hello '+ user.firstName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token + '\n\nThank You!\n');

        // let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'nodet76@gmail.com',
        //         pass: 'Qwer@1234',
        //     },
        //     tls:{
        //         rejectUnauthorized: false
        //     }
        // });

        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: 'nodet76@gmail.com', // sender address
        //     to: user.email, // list of receivers
        //     subject: "Email verification!", // Subject line
        //     text: 'Hello '+ user.firstName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token + '\n\nThank You!\n', // plain text body
        // });

        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
}



