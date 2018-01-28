var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = require('monk')('localhost:27017/yijian')

router.get('/', function(req, res, next){        
    var articles= db.get('talks')
    articles.find({},{},function(e,data){
        res.send(JSON.stringify(data));
    })
})

module.exports = router;
