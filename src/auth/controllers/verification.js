const AuthModel = require("../models/Auth");
// const { user: userSchema } = require("../validation/userSchema");
const jwt = require('jsonwebtoken');

exports.verify = async function(req, res) {

    try {
        const token = jwt.verify(req.params.token, "workingonpplsocialsiteapirightnow");
        const userDetail = await AuthModel.findOne({_id: token._id});

        if (!userDetail){
            console.log('Invalid user');
            res.status(400).send('Invalid User');
            return;
        }
        userDetail.isVerified = true;
        console.log("Changed verification", userDetail.isVerified);
        res.redirect('https://www.google.com/');
        await userDetail.save();
        res.status(200).send('user Verified successfully');
        

    } catch (err) {
        res.status(400).send(err);
    }
}