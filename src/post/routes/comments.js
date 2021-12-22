const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const commentPost = require('../controllers/comment');

router.post('/comment/:id', commentPost.commentOnPost);

router.get('/comment/:id', commentPost.getComments);

router.delete('/delete-comment/:id', commentPost.deleteComment);

router.put('/update-comment/:id', commentPost.updateComment);