const router =  require('express').Router();
const auth = require('../config/jwt');

const {fetchUser,Login,DashBoard} = require('../controllers/user');
router.post('/signup',fetchUser);
router.post('/login',Login);
router.post('/dashboard',auth,DashBoard);

module.exports = router;