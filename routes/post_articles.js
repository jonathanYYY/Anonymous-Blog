var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = require('monk')('localhost:27017/yijian')
var articles= db.get('articles')
var cookieParser = require('cookie-parser')

router.post('/', function(req, res) {
    var uid=req.cookies.uid
    var subject_title=req.body.subject_title
    var subject_content=req.body.subject_content
    var data={"uid":uid,"subject_title":subject_title,"subject_content":subject_content}
    if(req.body.subject_title && req.body.subject_content ){
        articles.insert(data)
        res.send(JSON.stringify(data));
    }
    else{
        res.send('Error about data!');
    }
});

router.get('/', function(req, res) {
    res.send("Error!Doesn't Allow Get!");

});

// console.log(new Date().toLocaleString())

// var data = function(db) {
//     return function(req, res) {
//         var articles= db.get('articles')
//         articles.insert(data)
//     };
//   };
//   router.post('/', data(db));
// router.post('/',function(req,res){
// 	var username=req.body.username;
// 	var password=req.body.password;
// 	console.log(username);
// 	console.log(password);
// 	var data=[{"username":username,"password":password}];
// 	//拿到数据后追加到数据库中
// 	var insertData= function(db,callback){
// 		//连接到数据文档
// 		var collection=db.collection('persons');
// 		collection.insert(data,function(err,result){
// 			if(err){
// 				console.log("Error"+err);
// 				return;
// 			}
// 		})
// 	}
// 	MongoClient.connect(DB_CONN_STR,function(err,db){
// 		console.log("连接成功");
// 		insertData(db,function(result){
// 			console.log(result);
// 			db.close();
// 		})
// 	})
// })

module.exports = router;
