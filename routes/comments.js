const express = require('express');
const router = express.Router();
// to authenticate if the user is logged in to share a post
const passport = require('passport');

const commentController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentController.create);

module.exports = router;