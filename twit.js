var Twit = require('twit');



// Twit user Auth with Dev Credentials
function getProfile(credentials) {
    return new Twit(credentials);
}

// Using Twitter's API to get the results in a JSON Format




/*API Reference: Returns a collection of the most recent Tweets posted by the user indicated 
by the screen_name or user_id parameters
https://dev.twitter.com/rest/reference/get/statuses/user_timeline
*/
function getLatestTweets(profile) {
    return profile.get('statuses/user_timeline',
     {
     screen_name: profile.screen_name, 
     count: 5
      });
}

/*API Reference : Returns a cursored collection of user objects for every user the specified user 
is following (otherwise known as their “friends”).
At this time, results are ordered with the most recent following first
https://dev.twitter.com/rest/reference/get/friends/list
*/
function getRecentFriends(profile) {
    return profile.get('friends/list', 
    	{ 
    	 screen_name: profile.screen_name ,
    	 count: 5 
    	});
}

/*API Reference :Returns the 20 most recent direct messages sent by the authenticating user. 
Includes detailed information about the sender and recipient user
https://dev.twitter.com/rest/reference/get/direct_messages/sent
*/
function getLatestMessages(profile) {
    return profile.get('direct_messages/sent', 
    	{ screen_name: profile.screen_name, 
    	  count: 5 
    	});
}

//Object literal module exports
module.exports = {

	getProfile: getProfile,
	getLatestMessages: getLatestMessages,
	getLatestTweets: getLatestTweets,
	getRecentFriends: getRecentFriends
}

