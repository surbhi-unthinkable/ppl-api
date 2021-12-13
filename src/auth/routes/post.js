const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const postAuth = require('../controllers/postController');

router.post('/create', postAuth.create);
router.delete('/:id', postAuth.delete);
router.get('/getall', postAuth.getAll);
router.post('/uploadfile', postAuth.uploadFile);
router.post('/uploadfiles',postAuth.uploadFiles);
router.put('/uploadprofile/:id', postAuth.uploadProfile);
router.get('/get/:id', postAuth.getUser);
// router.post('/uploadfiles', postAuth.uplaodFiles);

module.exports = router;