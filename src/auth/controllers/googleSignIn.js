require("dotenv").config();
const Register = require('../models/Auth');
const jwt = require("jsonwebtoken");

// Google Auth
const { OAuth2Client } = require('google-auth-library');


exports.signIn = async function (req, res) {
    const CLIENT_ID = '157992251308-leo6ovdru7psean75p5k6m8lu28g9156.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);
    let token = req.body.token;
    console.log(token);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);
};