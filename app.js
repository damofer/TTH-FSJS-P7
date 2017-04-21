var express = require('express');
var path = require('path');

var twitter_credentials = require(__dirname+'/config.js');

// var index = require(__dirname+'/routes/index');

var twit = require(__dirname + '/twit.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(express.static(path.join(__dirname, 'public')));







// Middleware - Twitter authentication
app.use(function(req, res, next) {
	var user =  twit.getProfile(twitter_credentials);
	
	req.latestTweets =twit.getLatestTweets(user);
	req.recentFriends =twit.getRecentFriends(user);
	req.latestMessages =twit.getLatestMessages(user);

	

		
	next();
});

//when pointing to the root, it will handle  the info that was on the req.
app.get('/', function(req, res) {
	
	var latestTweets;
	req.latestTweets.then(function(data){
		latestTweets =data.data;
	});
	var recentFriends;
	req.recentFriends.then(function(data){
		recentFriends=data.data.users;
	});

	var latestMessages;
	req.latestMessages.then(function(data){
		latestMessages=data.data;
	});

	Promise.all([req.latestTweets,req.recentFriends,req.latestMessages]).then(function(){
		// send params to the view.
		res.render(path.join(__dirname, 'views/index.pug'), { 
															latestTweets:latestTweets,
															recentFriends:recentFriends,
															latestMessages:latestMessages
															});
	});


  

});



app.listen(3000, function() {

	console.log("The frontend server is running on port 3000!");



});
module.exports = app;
