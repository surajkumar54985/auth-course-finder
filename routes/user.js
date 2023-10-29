const router =  require('express').Router();
const auth = require('../config/jwt');

const {fetchUser,Login,DashBoard,verifyUser,resendLink,courses} = require('../controllers/user');
router.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to user URL of Server");
});
router.post('/signup',fetchUser);
router.post('/login',Login);
router.post('/dashboard',auth,DashBoard);
router.get('/verify/:email/:token',verifyUser);
router.post('/resend',resendLink);
router.get('/courses',courses);

module.exports = router;