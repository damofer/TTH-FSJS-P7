var express = require('express');
var router = express.Router();

/*var Twit = require('twit');
var twitter_credentials = require('../config.js');

var T = new Twit(twitter_credentials);*/


/*var ven = T.get('search/tweets', { q: 'Venezuela since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data);
});*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});

 

});

module.exports = router;
