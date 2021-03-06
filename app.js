const express    			= require ('express'),
	  mongoose    		    = require('mongoose'),
	  app 	     			= express(),
	  bodyParser			= require('body-parser'),
	  flash				 	= require('connect-flash'),
	  methodOverride		= require('method-override'),
	  passport  			= require('passport'),
	  localStrategy			= require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  User					= require('./models/user'),
	  Campground 			= require('./models/campground'),
	  Comment    			= require('./models/comment'),
	  seedDB        		= require('./seeds');

// configure dotenv
require('dotenv').config();

// REQURING ROUTES

const campgroundRoutes = require('./routes/campgrounds'),
	  commentRoutes	   = require('./routes/comments'),
	  indexRoutes  	   = require('./routes/index');

// APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
mongoose.connect(process.env.HOST, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//require moment
app.locals.moment = require('moment');
// seedDB();

// PASSPORT CONFIG

app.use(require('express-session')({
	secret: 'Mona2003',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// ROUTES

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.get('*', function(req,res){
	req.flash('error', 'The Page is not found');
	res.redirect('/');
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('server has started');
});