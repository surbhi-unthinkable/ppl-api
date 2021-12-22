const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// Upload Single file
exports.uploadFile = async function (req, res) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString + file.originalname);
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: (1024 * 1024 * 6)
        }

    }).single('postImage');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        console.log(req.file.path);

        const {
            userId, desc, category
        } = req.body;

        const newPost = await new Post({
            userId,
            desc,
            category,
            postImage: req.file.path,
        })

        const savedPost = await newPost.save();
        res.status(200).send(savedPost);

    })

}