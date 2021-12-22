const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');

// Like post
exports.likePost = async function (req, res) {
    try {
        const post = await Post.findById({ _id: req.params.id });
        const hasLiked = post.likeUserId.includes(req.body.userId);
        const hasUnliked = post.unlikeUserId.includes(req.body.userId);

        addRemoveLike(post, hasLiked, hasUnliked, req.body.userId, true);

        res.status(200).send("Liked successfully!!");

    } catch (error) {
        res.status(500).send(error);
    }
}

// Dislike post
exports.unlikePost = async function (req, res) {
    try {
        const post = await Post.findById({ _id: req.params.id });
        const hasLiked = post.likeUserId.includes(req.body.userId);
        const hasUnliked = post.unlikeUserId.includes(req.body.userId);

        addRemoveUnlike(post, hasLiked, hasUnliked, req.body.userId, true);

        res.status(200).send("Unliked successfully!!");

    } catch (error) {
        res.status(500).send(error);
    }
}

const addRemoveLike = async (post, hasLiked, hasUnliked, id, liked) => {

    if (liked === true) {
        if (!hasLiked && !hasUnliked) {
            likeUpdatePost(post, id, true);

        } else if (!hasLiked && hasUnliked) {
            unlikeUpdatePost(post, id, false);
        }

    } else {
        likeUpdatePost(post, id, false);
    }


    return post;
}

const addRemoveUnlike = async (post, hasLiked, hasUnliked, id, unliked) => {
    if (unliked === true) {
        if (!hasLiked && !hasUnliked) {
            unlikeUpdatePost(post, id, true)

        } else if (hasLiked && !hasUnliked) {
            likeUpdatePost(post, id, false);
        }

    } else {
        unlikeUpdatePost(post, id, false);
    }

    return post;
}

const likeUpdatePost = async (post, id, updateId) => {
    if (updateId) {
        await post.likeUserId.unshift(id);
        await post.save();
        updateLikeCount(post, id, true);

    } else {
        await post.likeUserId.remove(id);
        await post.save();
        updateLikeCount(post, id, false);
    }
}

const unlikeUpdatePost = async (post, id, updateId) => {
    if (updateId) {
        await post.unlikeUserId.unshift(id);
        await post.save();
        updateUnlikeCount(post, id, true);
        return post;

    } else {
        await post.unlikeUserId.remove(id);
        updateUnlikeCount(post, id, false)
    }
}

const updateLikeCount = async (post, id, incDecCount) => {
    if (incDecCount) {
        post.likesCount += 1;
        await post.save();
        return post;

    } else {
        post.likesCount -= 1;
        await post.save();
        unlikeUpdatePost(post, id, true);
    }
}

const updateUnlikeCount = async (post, id, incDecCount) => {
    if (incDecCount) {
        post.unlikedCount += 1
        await post.save();
        return post;

    } else {
        post.unlikedCount -= 1;
        await post.save();
        likeUpdatePost(post, id, true);
    }
}