var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  req.test.then(function(data){
  	console.log(data);
  	res.render('index', { title: 'Express'});
  })

 

});

module.exports = router;
