var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = require('monk')('localhost:27017/yijian')

// var data = function(db) {
//   return function(req, res) {
//       var articles= db.get('articles')
//       articles.find({},{},function(e,data){
//           res.send(JSON.stringify(data));
//       });
//   };
// };

router.get('/', function(req, res, next){        
    var articles= db.get('articles')
    articles.find({},{},function(e,data){
        res.send(JSON.stringify(data));
    })
})

module.exports = router;
