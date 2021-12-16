const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const router = new express.Router();
const Register = require("../models/Auth");
const registerAuth = require("../controllers/register");
const loginAuth = require("../controllers/login");
const verificationAuth = require('../controllers/verification');
const googleSignInAuth = require('../controllers/googleSignIn')
const forgetPasswordAuth = require("../controllers/forgetPassword");
const resetPasswordAuth = require('../controllers/resetPassword');
const { addUserValidation } = require("../validation/userValidation");

// require("../controllers/googleRegister");

router.post('/register', addUserValidation, registerAuth.register);
router.get('/google', (req,res)=>{
    res.render('google');
});
router.post('/google', googleSignInAuth.signIn);
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
//     function (req, res) {
//         // Successful authentication, redirect success.
//         res.redirect('/success');
//     });
router.get('/confirmation/:token', verificationAuth.verify);
router.post('/login', loginAuth.login);
router.post('/forgetPassword', forgetPasswordAuth.forgetPassword);
router.get('/resetPassword/:id/:token', resetPasswordAuth.getResetPassword);
router.post('/resetPassword/:id/:token', resetPasswordAuth.postResetPassword);

// router.get('/', (req, res) => {
//     res.send("Hey!")
// });

module.exports = router;