const router =  require('express').Router();
const auth = require('../config/jwt');

const {fetchAdmin,adminLogin,DashBoard,verifyAdmin,resendLink,addCourse} = require('../controllers/admin');
router.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to admin URL of Server");
});
router.post('/signup',fetchAdmin);
router.post('/login',adminLogin);
router.post('/dashboard',auth,DashBoard);
router.get('/verify/:email/:token',verifyAdmin);
router.post('/resend',resendLink);
router.post('/addcourse',addCourse);

module.exports = router;