const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');//just to check if it is working

router.get('/',homeController.home);
module.exports = router;