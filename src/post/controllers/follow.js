const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const { Mongoose } = require('mongoose');
const Auth = require('../../auth/models/Auth');

// Follow user
exports.followUser = async function (req, res) {
    try {
        if (req.body.userId !== req.params.id) {
            const user = await Auth.findById(req.params.id);
            const currentUser = await Auth.findById(req.body.userId);


            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({
                    $push: { followers: req.body.userId }
                });
                await currentUser.updateOne({
                    $push: { following: req.body.userId }
                });

                res.status(200).send("user has been followed")

            } else {
                res.status(403).send("Already following");
            }

        } else {
            res.status(400).send("Can't follow yourself");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}