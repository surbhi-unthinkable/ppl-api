const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// Uploading multiple files
exports.uploadFiles = async function (req, res) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString + file.originalname);
        }
    })

    const fileFilter = async (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
        const extname = await fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = await fileTypes.test(file.mimeType);

        if (mimeType && extension) {
            cb(null, true);
        } else {
            cb('Kindly upload images or videos only!');
        }
    }

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: (1024 * 1024 * 6)
        },
        fileFilter: fileFilter

    }).array('postImage', 6);

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        console.log(req.file.path);
        // res.send(req.file)



        const {
            userId, desc, category
        } = req.body;

        const newPost = await new Post({
            userId,
            desc,
            category,
            postImage: req.file.path,
        })



        try {
            const savedPost = await newPost.save();
            res.status(200).send(savedPost);

        } catch (error) {
            res.status(500).send(error);
        }
    })

}