const express = require('express');
const jwt = require('jsonwebtoken');
const Register = require('../models/Auth');

exports.forgetPassword = async function (req, res) {
    const userEmail = await Register.findOne({email: req.body.email});
    

    if (!userEmail.email){
        res.status(404).send("Invalid Email Id!");
    }else{
        let otpcode = Math.floor((Math.random() * 1000000) + 1)
    }

    const secret = token + userEmail.password;
}