const express 	 = require('express'),
	  router     = express.Router(),
	  Campground = require('../models/campground'),
	  Comment = require("../models/comment"),
	  middleware = require('../middleware/index');

// CAMPGROUNDS ROUTES

// SHOW CAMPGROUNDS
router.get('/', function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {console.log(err)
		} else {
			res.render('campgrounds/index',{campgrounds: allCampgrounds, page: 'campgrounds'});
		};
	});
});	

// CAMPGROUND CREATE
router.post('/', middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var cost = req.body.cost;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, cost: cost, description: description, author: author};
	Campground.create(newCampground, function(err, newlyCreated){
		if (err){console.log(err)
		} else {
			console.log(newlyCreated);
			req.flash('success', 'Successfully created campground');
			res.redirect('/campgrounds');
		};
	});
});

// CAMPGROUND NEW
router.get('/new', middleware.isLoggedIn, function(req,res){
	res.render('campgrounds/new');
});

// SHOW CAMPGROUND
router.get('/:id', function(req,res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if (err || !foundCampground){
			req.flash('error', 'Campground not found');
			res.redirect('back');
		} else {
			res.render('campgrounds/show', {campground: foundCampground});	
		}
	});
});

// CAMPGROUND EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		res.render('campgrounds/edit', {campground: campground});
	});	
});

// CAMPGROUND UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully updated campground');
			res.redirect('/campgrounds/' + req.params.id);
		};	
	});
});

// DELETE - removes campground and its comments from the database
router.delete('/:id', middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		foundCampground.comments.forEach(function(foundComment){
			Comment.findByIdAndRemove(foundComment._id, function(err, deletedComment){
				if (err){
					console.log(err);
					res.redirect('back');
				} 
			});
		});
	});
	Campground.findByIdAndRemove(req.params.id, function(err, deletedCamp){
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Successfully removed campground');
			res.redirect('/campgrounds');
		};	
	});
});

module.exports = router;