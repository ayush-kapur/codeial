const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');//just to check if it is working

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
//For any further routes access from here
//router.use('/routerName',require('./routerfile));

module.exports = router;