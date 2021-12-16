const express = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const bcrypt = require("bcryptjs");

exports.getResetPassword = async function(req, res){
    const {id, token} = req.params;
    const userDetail = await Auth.findOne({_id: req.params.id});
    const SECRET_KEY = "secret key for forget password"

    if (userDetail.id !== id){
        res.send('Invalid email id');
        return
    }

    const secret = SECRET_KEY + userDetail.password;
    try {
        const payload = jwt.verify(token, secret);
        res.render('resetPassword', {email: userDetail.email});

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.postResetPassword = async function(req, res){
    
    const {id, token} = req.params;
    let {password, confirmPassword} = req.body;
    const userDetail = await Auth.findOne({_id: id});
    const SECRET_KEY = "secret key for forget password"

    if (userDetail.id !== id){
        res.send('Invalid email id');
        return
    }

    const secret = SECRET_KEY + userDetail.password;
    try {
        const payload = jwt.verify(token, secret);

        if (password !== confirmPassword){
            res.status(500).send('Password and confirm password not matching!!');
            return

        }else{
            
            userDetail.password = password;
            userDetail.confirmPassword = confirmPassword;
            await userDetail.save();
            res.send(userDetail);
        }


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}