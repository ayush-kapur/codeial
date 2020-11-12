const express = require('express');
const router = express.Router();
// to authenticate if the user is logged in to share a post
const passport = require('passport');

const postController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router