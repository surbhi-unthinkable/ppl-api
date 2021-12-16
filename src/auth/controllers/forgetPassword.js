const express = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const sgMail = require('@sendgrid/mail');

exports.forgetPassword = async function (req, res) {
    const user = await Auth.findOne({email: req.body.email});
    const SECRET_KEY = "secret key for forget password"

    if (!user.email){
        res.status(404).send("Invalid Email Id!");
    }else{
        const secret = SECRET_KEY + user.password;
        const token = await jwt.sign({_id: user._id}, secret, {
            expiresIn: "15m"
        });
        const link = `http://localhost:5000/auth/resetPassword/${user._id}/${token}`;
        console.log(link);
        // res.send('Password reset link has been sent to your email!!');

        // for sending mail
        const API_KEY = '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';
        sgMail.setApiKey(API_KEY);

        const message = {
            to: user.email,
            from: {
                name: 'Node test',
                email: 'nodet76@gmail.com'
            },
            subject: 'Reset Password',
            text: `Hello ${user.firstName}
            You can reset your password by clicking the link: 
            ${link}
            Thank You!`,
            html:
            `<h1>Hello ${user.firstName}</h1>
            <p>Please verify your account by clicking the link:</p>
            <a href="${link}">Click here</a>
            <h4>Thank You!</h4>`
        }

        sgMail.send(message)
        .then((res) => {
            console.log('Email sent!');
        })
        .catch((err) => console.log(err))

        res.send('Email sent!')
    }

}