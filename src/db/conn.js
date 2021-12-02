const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pplApi", {

}).then(() =>{
    console.log('Connection successful!');
}).catch((e) => {
    console.log(e);
})