var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = require('monk')('localhost:27017/yijian')
var articles= db.get('articles')

router.post('/', function(req, res) {
    var user_cookie=req.body.user_cookie
    var subject_title=req.body.subject_title
    var ts=req.body.ts
    var subject_content=req.body.subject_content
    var data={"user_cookie":user_cookie,"subject_title":subject_title,"ts":ts,"subject_content":subject_content}
    if(req.body.user_cookie &&req.body.subject_title && req.body.ts && req.body.subject_content ){
        articles.insert(data)
        res.send(JSON.stringify(data));
    }
    else{
        res.send('Error!');
    }
});

router.get('/', function(req, res) {
    res.send('Error!');

});
module.exports = router;
