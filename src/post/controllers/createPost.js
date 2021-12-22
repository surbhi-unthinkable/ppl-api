const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');


// creating post
exports.create = async function (req, res) {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);

    } catch (error) {
        res.status(500).send(error);
    }
}