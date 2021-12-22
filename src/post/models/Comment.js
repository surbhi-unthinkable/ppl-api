require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    commentByUser: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{timestamps: true});



// creating a collection
const Comment = new mongoose.model('Post', CommentSchema);
module.exports = Comment;