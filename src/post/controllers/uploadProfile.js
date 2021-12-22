const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// Uploading profile image
exports.uploadProfile = async function (req, res) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString + file.originalname);
        }
    })

    const fileFilter = async (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
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
        }

    }).single('postImage');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        // console.log(req.file.path);
        res.send(req.file)
    })
}