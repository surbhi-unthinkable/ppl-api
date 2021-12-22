const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

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

        res.send({
            totalPages: Math.ceil(count / size),
            currentPage: page,
            data: posts
        });

    } catch (error) {
        res.status(500).send(error);
    }
}