const { query } = require('express');
const Post = require('../models/Post');
const { post } = require('../routes/post');
const multer = require('multer');
// const path = require('path');
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


// get all posts
exports.getAll = async function (req, res) {
    try {
        // const posts = await Post.find().sort({ Date: -1 });
        // res.send(posts);

        let { page, size } = req.query;

        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 5;
        }

        let query = {};
        if (req.query.category) {
            query.$or = [{
                "category": { $regex: req.query.category }
            }]
        }

        const limit = Number(size);
        const skip = (page - 1) * size;
        const posts = await Post.find(query).limit(limit).skip(skip);

        const count = await Post.countDocuments();

        res.send({
            totalPages: Math.ceil(count / size),
            currentPage: page,
            data: posts
        });

    } catch (error) {
        res.status(500).send(error);
    }
}

// Upload Single file
exports.uploadFile = async function (req, res) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
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

    }).single('postImage');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        console.log(req.file.path);
        // res.send(req.file)

        

        const {
            userId, likesCount, unlikeCount, likeArray, unlikeArray, following, follower, desc, category
        } = req.body;

        const newPost = new Post({
            userId,
            likesCount,
            unlikeCount,
            likeArray,
            unlikeArray,
            following,
            follower,
            desc,
            category,
            postImage: req.file.path,
        })



        try {
            const savedPost = newPost.save();
            res.status(200).send(savedPost);

        } catch (error) {
            res.status(500).send(error);
        }
    })

}

// Uploading multiple files
exports.uploadFiles = async function (req, res) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
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

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        console.log(req.file.path);
        // res.send(req.file)

        

        const {
            userId, likesCount, unlikeCount, likeArray, unlikeArray, following, follower, desc, category
        } = req.body;

        const newPost = new Post({
            userId,
            likesCount,
            unlikeCount,
            likeArray,
            unlikeArray,
            following,
            follower,
            desc,
            category,
            postImage: req.file.path,
        })



        try {
            const savedPost = newPost.save();
            res.status(200).send(savedPost);

        } catch (error) {
            res.status(500).send(error);
        }
    })

}

// Updating profile image
exports.uploadProfile = async function(req, res){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
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
        },
        fileFilter: fileFilter

    }).single('postImage');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Something went wrong!');
        }
        // console.log(req.file.path);
        res.send(req.file)
    })
}

// get posts of a particular user
exports.getUser = async function(req, res){
    try {
        const posts = await Post.find();
        post.exec(function(err, data){
            if (err) throw err;
            res.send(data);
        })

    } catch (error) {
        res.status(500).send(error);
    }
}
