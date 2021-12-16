require("dotenv").config();
const Register = require('../models/Auth');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async function (req, res) {
    try {
        if (!userEmail.isVerified) {
            res.send('Please verify your email!');
            return
        } else {
            const email = req.body.email;
            const password = req.body.password;

            const userEmail = await Register.findOne({ email: email });
            if (!userEmail) {
                res.status(400).send("Email/ password not matching!!");
                return;
            }


            const hashedPassword = await bcrypt.hash(userEmail.password, 10)
            const isMatch = await bcrypt.compare(password, hashedPassword);


            if (isMatch) {
                res.status(201).send(userEmail);

            } else {
                res.status(400).send("Email/ password not matching!!");
            }
        }


    } catch (error) {
        res.status(400).send(error);
        console.log("The error is: ", error);
    }
};