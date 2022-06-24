const router =  require('express').Router();
const auth = require('../config/jwt');

const {fetchUser,Login,DashBoard,verifyUser,resendLink} = require('../controllers/user');
router.post('/signup',fetchUser);
router.post('/login',Login);
router.post('/dashboard',auth,DashBoard);
router.get('/verify/:email/:token',verifyUser);
router.post('/resend',resendLink);

module.exports = router;