const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid Email Id!");
            }
        }
    },
    dob: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{timestamps: true});

// generating auth token
EmployeeSchema.methods.generateAuthToken = async function(){
    try {
        console.log(this._id);
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECREt_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    } catch (error) {
        res.status(400).send(e);
        console.log("The error is:", error);
    }
};

// converting passwrods into hash
EmployeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        // const passwordhash = await bcrypt.hash(password, 10);
        console.log(`The current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`The current password is ${this.password}`);
        this.confmPass = undefined;
    }

    next();
});

// creating a collection
const Register = new mongoose.model('Register', EmployeeSchema);
module.exports = Register;

// const joi = require("joi");

// const schema = joi.object({
//     firstName: joi.string().required(),
//     lastname: joi.string().required(),
//     email: joi.string(),
//     password: joi.string().lowercase().uppercase().alphanum()
// })