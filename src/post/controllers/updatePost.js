const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');
const Auth = require('../../auth/models/Auth');

// Update post 
exports.updatePost = async function (req, res) {


    const userVer = await Post.findOne({ _id: req.params.id });
    const currUser = await Auth.findOne({ _id: userVer.userId });
    if (currUser.id !== userVer.userId) {
        console.log("Cannot update others post!!");
        return res.status(500).send("Cannot update others post!!");
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString + file.originalname);
        }
    })

    // const fileFilter = async (req, file, cb) => {
    //     const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
    //     const extname = await fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimeType = await fileTypes.test(file.mimeType);

    //     if (mimeType && extension) {
    //         cb(null, true);
    //     } else {
    //         cb('Kindly upload images or videos only!');
    //     }
    // }

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: (1024 * 1024 * 6)
        }
        // fileFilter: fileFilter

    }).single('postImage');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        console.log(req.file.path);
        // res.send(req.file)

        const userPost = await Post.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                desc: req.body.desc,
                category: req.body.category,
                postImage: req.file.path
            }
        });

    })

    try {
        res.status(200).send(userPost);

    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }

}