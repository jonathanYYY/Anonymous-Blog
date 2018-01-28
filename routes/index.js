var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = require('monk')('localhost:27017/yijian')
var logs= db.get('logs')
var cookieParser = require('cookie-parser')


/* GET home page. */
router.get('/', function(req, res, next) {
    // if(req.cookies.uid){
        // res.cookie('uid', req.cookies.uid, { maxAge: 31536000000, httpOnly: true })
        res.render('index')
    // }else{
    //     res.render('newuser')
    // }

});

// router.get('/post',function(req, res) {
//     res.render('post');
// })

// router.get('/talk',function(req, res) {
//         res.render('talk')
// })








module.exports = router;
