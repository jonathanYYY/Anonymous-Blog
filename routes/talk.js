var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('talk', { title: 'Talk' });
});

module.exports = router;
