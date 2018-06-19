const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
	name: String,
	pets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Pet"
		}
	]
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;