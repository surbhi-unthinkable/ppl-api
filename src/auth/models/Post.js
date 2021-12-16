require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    unlikedCount: {
        type: Number,
        default: 0
    },
    likeUserId: {
        type: Array,
        default: []
    },
    unlikeUserId: {
        type: Array,
        default: []
    },
    comment: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 500
    },
    category: {
        type: String,
        required: true
    },
    postImage: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{timestamps: true});



// creating a collection
const Post = new mongoose.model('Post', PostSchema);
module.exports = Post;

