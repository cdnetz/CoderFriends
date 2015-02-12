var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GitHubApi = require("github");
var GitHubStrategy = require('passport-github').Strategy;

var app = express();

var port = (8002);



app.use(express.static(__dirname+'/public'));
app.use(session({secret: 'klsdfh234$#'}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new GitHubStrategy({
	clientID: 'af929ccec7c710285266',
	clientSecret: 'b8ff7369b26972fa0109d5719eed497e4eeda7bb',
	callbackURL:'http://localhost:8002/auth/github/callback'	

}, function (token, refreshToken, profile, done) {
	return done(null, profile);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var github = new GitHubApi({
	 version: "3.0.0"
});




var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/#/home');
	}
	next();
}

app.get('/api/github/following', isAuthed, function(req, res) {
	github.user.getFollowingFromUser({
	user: "cdnetz"
}, function(err, response) {
	console.log(JSON.stringify(response));
	if(!err){
		res.status(200).json(response)
	} else {
		console.log(err);
		res.status(418).json(err);
	}
})
})

app.get('/auth/github', passport.authenticate('github'))

app.get('/auth/github/callback', passport.authenticate('github', {
	successRedirect: '/#/home',
	failureRedirect: '/index.html'
}))

app.listen(port);