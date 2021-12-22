const express = require('express');
const Post = require('../models/Post');
const Auth = require('../../auth/models/Auth');
const Comment = require('../models/Comment');
const multer = require('multer');
const { Mongoose } = require('mongoose');
const Post = require('../models/Post');

// Comment on post
exports.commentOnPost = async function (req, res) {
    try {
        const comment = await Comment.findById({ _id: req.params.id });
        const object = {
            id: req.body.userId,
            comment: req.body.comment
        };

        await comment.commentByUser.unshift(object);
        comment.commentsCount += 1;
        await comment.save();
        res.status(200).send("Commented successfully!!");

    } catch (error) {
        res.status(500).send(error);
    }
}

// get comments
exports.getComments = async function (req, res) {
    try {
        // const comment = await Comment.findById({id: req.params.id});
        const post = await Post.findById({ id: req.params });
        const comment = await Comment.findById({ postId: req.params });

        res.send(comment.commentByUser);

    } catch (error) {
        res.status(500).send(error);
    }
}

// delete comment
exports.deleteComment = async function (req, res) {
    try {
        const comment = await Comment.findById({ id: req.params });
        const removeId = id;
        const filterComment = comment.commentByUser.filter((item) => item.id !== removeId);
        filterComment.save();
        res.send(filterComment);

    } catch (error) {
        res.status(500).send(error);
    }
}

// update comment
exports.updateComment = async function (req, res) {
    try {
        const comment = await Comment.findById({id: req.params});
        const newComment = comment.commentByUser.map((item) => {
            if (item.id == req.params){
                item.comment = req.body;
            }
        })
        newComment.save();


    } catch (error) {
        res.status(500).send(error);
    }
}