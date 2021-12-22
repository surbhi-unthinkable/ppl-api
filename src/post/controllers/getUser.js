const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// get posts of a particular user
exports.getUser = async function (req, res) {
    try {
        const posts = await Post.find();
        post.exec(function (err, data) {
            if (err) throw err;
            res.send(data);
        })

    } catch (error) {
        res.status(500).send(error);
    }
}