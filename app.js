require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/auth/routes/auth');
const postRouter = require('./src/post/routes/post');
const passport = require('passport');
require('./src/db/conn');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
app.use(passport.session());

// registering router
app.use('/auth', authRouter);
app.use('/post', postRouter);

console.log("uexhgu", process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server is litening to port ${PORT}`);
})

// API_KEY = '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'
// clientId = '157992251308-leo6ovdru7psean75p5k6m8lu28g9156.apps.googleusercontent.com'
// clientSecret = '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'