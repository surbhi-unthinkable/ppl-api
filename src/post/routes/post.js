const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
// const postAuth = require('../controllers/');
const createPost = require('../controllers/createPost');
const deletePost = require('../controllers/deletePost');
const getAllPost = require('../controllers/getAllPost');
const getUserPost = require('../controllers/getUser');
const uploadFile = require('../controllers/uploadFile');
const uploadMultipleFiles = require('../controllers/uploadMultipleFiles');
const uploadProfile = require('../controllers/uploadProfile');
const updatePost = require('../controllers/updatePost');
const likeDislikePost = require('../controllers/likeDislike');
const followPost = require('../controllers/follow');


router.post('/create', createPost.create);

router.delete('/:id', deletePost.delete);

router.get('/getall', getAllPost.getAll);

router.get('/get/:id', getUserPost.getUser);

router.post('/uploadfile', uploadFile.uploadFile);
router.post('/uploadfiles',uploadMultipleFiles.uploadFiles);

router.put('/uploadprofile/:id', uploadProfile.uploadProfile);

router.put('/updatepost/:id', updatePost.updatePost);

router.put('/like/:id', likeDislikePost.likePost);
router.put('/unlike/:id', likeDislikePost.unlikePost);

router.put('/follow/:id', followPost.followUser);

module.exports = router;