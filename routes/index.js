const express 	 = require('express'),
	  router     = express.Router(),
	  passport   = require('passport'),
	  Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment'),
	  User 		 = require('../models/user'),
	  middleware = require('../middleware/index');

// HOME ROUTE
router.get('/', function(req,res){
	res.render('landing');
});

// 	AUTH ROUTES

// REGISTER FORM
router.get('/register', function(req,res){
	res.render('register', {page: 'register'});
});

// REGISTER
router.post('/register', function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			// req.flash('error', err.message);
			return res.render('register', {error: err.message});
		}	
		passport.authenticate('local')(req,res,function(){
			req.flash('success', 'Welcome to YelpCamp, ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

// LOGIN FORM
router.get('/login', function(req,res){
	res.render('login', {page: 'login'});
});

// LOGIN
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/campgrounds',
		failureRedirect:  '/login',
		failureFlash: true,
	}), function(req,res){
});

// LOGOUT
router.get('/logout', function(req,res){
	req.logout();
	req.flash('success', "Logged you out");
	res.redirect('/campgrounds');
});

module.exports = router;