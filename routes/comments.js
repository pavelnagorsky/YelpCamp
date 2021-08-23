const express 	 = require('express'),
	  router     = express.Router({mergeParams: true}),
	  Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment'),
	  middleware = require('../middleware/index');

// COMMENTS ROUTES

// COMMENT NEW
router.get('/new', middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if (err){console.log(err)
		} else {
			res.render('comments/new',{campground: camp});
		}
	});
});

// COMMENT CREATE
router.post('/', middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if (err || !camp){
			req.flash('error', 'Campground not found');
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err);
					req.flash('error', 'Something went wrong');
				} else {
					// ADD USERNAME AND ID TO COMMENT
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// SAVE AND PUSH COMMENT
					comment.save();
					camp.comments.push(comment);
					// SAVE CAMP AND REDIRECT
					camp.save();
					req.flash('success', 'Successfully added comment');
					res.redirect('/campgrounds/' + camp._id);
				};
			});
		};
	});
});

// COMMENTS EDIT

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err || !foundCampground){
			req.flash('error', 'Campground not found');
			return res.redirect('back');
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err || !foundComment){
				req.flash('error', 'Comment not found');
				res.redirect('back');
			} else {
				res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// COMMENTS UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		};	
	});
});

// COMMENT DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', "Comment deleted");
			res.redirect('/campgrounds/' + req.params.id);
		};	
	});
});

module.exports = router;