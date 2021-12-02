const express = require("express");
const router = new express.Router();
const Register = require("../models/Register");
const registerAuth = require("../controllers/register");
const loginAuth = require("../controllers/login");
const { addUserValidation } = require("../validation/userValidation");

// router.post('/register', async(req, res) => {
//     try {
//         const {
//             firstName, lastName, email, dob, phoneNumber, password, confirmPassword
//         } = req.body;

//         if (password != confirmPassword){
//             res.send("Password not matching!");
//             return;
//         }

//         const user = new Register({
//             firstName,
//             lastName,
//             email,
//             dob,
//             phoneNumber,
//             password,
//             confirmPassword
//         });
        
//         const createUser = await user.save();
//         res.status(201).send(createUser);

//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

router.post('/register', addUserValidation, registerAuth.register);
router.post('/login', loginAuth.login);

// router.get('/', (req, res) => {
//     res.send("Hey!")
// });

module.exports = router;