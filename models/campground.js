const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	cost: Number,
	description: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = mongoose.model('Campground', campgroundSchema);

