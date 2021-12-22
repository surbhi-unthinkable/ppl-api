const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// Delete Post
exports.delete = async function (req, res) {
    try {
        const posts = await Post.findById(req.params.id);
        if (posts.userId === req.body.userId) {
            await posts.deleteOne();
            res.status(200).send("Post deleted successfully");
        } else {
            res.status(401).send("You can delete only your post!");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}