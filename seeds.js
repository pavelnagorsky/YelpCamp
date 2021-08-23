const mongoose   = require('mongoose'),
	  Campground = require('./models/campground'),
	  Comment 	 = require('./models/comment');

const data = [
	{
		name: 'Granite Hill',
		image: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
	},
	{
		name: 'Granite Hill',
		image: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
	},
	{
		name: 'Granite Hill',
		image: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
	},
	{
		name: 'Granite Hill',
		image: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
	},
];

function seedDB(){
	// Remove All Campgrounds
	Campground.deleteMany({},function(err){
		// if (err){console.log(err)
		// } else {
		// 	console.log('Succesfully removed Campground!');
		// 	Comment.deleteMany({}, function(err) {
		// 		if(err){
		// 			console.log(err);
		// 		} else {
		// 			console.log("removed comments!");	
		// 			// Add a few campgrounds
		// 			data.forEach(function(seed){
		// 				Campground.create(seed, function(err,campground){
		// 					if (err){console.log(err)
		// 					} else {
		// 						console.log('Added a New Campground');
		// 						//create a comment
		// 						Comment.create(
		// 							{
		// 								text: "This place is great, but I wish there was internet",
		// 								author: "Homer"
		// 							}, function(err, comment){
		// 								if(err){
		// 									console.log(err);
		// 								} else {
		// 									campground.comments.push(comment);
		// 									campground.save();
		// 									console.log("Created new comment");
		// 								}
		// 							}
		// 						);	
		// 					};
		// 				});
		// 			});
		// 		}	
		// 	});	
		// };
	});	
	// Add a few comments		
};

module.exports = seedDB;