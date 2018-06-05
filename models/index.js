const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
	.connect("mongodb://localhost/pets-app", {
		// useMongoClient: true
	})
	.then(() => {
		console.log("Pets App Connected To MongoDB");
	})
	.catch(err => {
		console.log("Error connecting Pets App to MongoDB", err);
	});

exports.Pet = require("./pet");