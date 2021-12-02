require("dotenv").config();
const Register = require('../models/Register');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email: email});
        const isMatch = await bcrypt.compare(password, userEmail.password);        

        // const token = await userEmail.generateAuthToken();

        // res.cookie("jwt", token, {
        //     httpOnly: true
        // })
        console.log(password, userEmail.password, email, userEmail.email);

        if(isMatch) {
            res.status(201).send(userEmail);

        }else{
            res.status(400).send("Email/ password not matching!!");
        }

    } catch (error) {
        res.status(400).send(error);
        console.log("The error is: ", error);
    }
};