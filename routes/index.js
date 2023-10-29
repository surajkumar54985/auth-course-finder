const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

console.log('Router loaded');

// router.get('/', userController.user);

router.use('/user',require('./user'));

// router.use('/users',require('./users'));

router.use('/admin' , require('./admin'));

// router.use('/comments',require('./comments'));

// router.use('/api',require('./api'));

//for any further routes, access it from here.
//router.use('routeName',require('./routerfile'));

module.exports = router;