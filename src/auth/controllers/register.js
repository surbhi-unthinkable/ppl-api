var Register = require("../models/Register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const mongoose = require("mongoose");

exports.register = async function(req, res){
    try {
        console.log("test")
        const {
            firstName, lastName, email, dob, phoneNumber, password, confirmPassword
        } = req.body;


        if (password != confirmPassword){
            res.send("Password not matching!");
            return;
        }

        const user = new Register({
            firstName,
            lastName,
            email,
            dob,
            phoneNumber,
            password
        });
        
        // const token = await user.generateAuthtoken();
        // res.cookie("jwt", token, {
        //     httpOnly: true
        // });

        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
}