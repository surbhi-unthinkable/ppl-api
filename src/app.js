require('dotenv').config()
const express = require('express');
require('./db/conn');

const app = express();

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`Server is litening to port ${PORT}`);
})