var express = require('express');
var path = require('path');

var twitter_credentials = require(__dirname+'/config.js');

// var index = require(__dirname+'/routes/index');

var twit = require(__dirname + '/twit.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/


// Middleware - Twitter authentication
app.use(function(req, res, next) {
	var user =  twit.getProfile(twitter_credentials);
	req.user= user;
	req.latestTweets =twit.getLatestTweets(user);
	req.recentFriends =twit.getRecentFriends(user);
	req.latestMessages =twit.getLatestMessages(user);

	

		
	next();
});

app.get('/', function(req, res) {
	var user = req.user;
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
		console.dir(user);
		// console.dir(latestTweets);
		// console.dir(recentFriends);
		// console.dir("latestMessages : " + latestMessages);
		res.render(path.join(__dirname, 'views/index.pug'), { user:user,
															latestTweets:latestTweets,
															recentFriends:recentFriends,
															latestMessages:latestMessages
															});
	});


  

});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
app.listen(3000, function() {

	console.log("The frontend server is running on port 3000!");



});
module.exports = app;
