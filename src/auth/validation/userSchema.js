const joi = require("joi");

const schema = {
    user: joi.object({
        firstName: joi.string().required().min(3).max(20),
        lastName: joi.string().required().min(3).max(20),
        email: joi.string().email().required(),
        dob: joi.date().required(),
        phoneNumber: joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number").required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    })
}

module.exports = schema;