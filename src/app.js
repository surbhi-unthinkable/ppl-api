require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require("./auth/routes/auth");
// const Register = require('./auth/models/Register');
require('./db/conn');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

// registering router
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server is litening to port ${PORT}`);
})