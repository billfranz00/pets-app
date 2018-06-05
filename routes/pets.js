const express = require('express');
const router = express.Router();

const {Pet} = require("../models");

router
	.route("")
	.get((req, res, next) => {
		return Pet.find().then(pets => {
			return res.render("index", {pets});
		});
	})
	.post((req, res, next) => {
		return Pet.create(req.body).then(pet => {
			return res.redirect("/");
		});
	});

router.route("/new").get((req, res, next) => {
	return res.render("new");
});

router
	.route("/:id")
	.get((req, res, next) => {
		return Pet.findById(req.params.id).then(pet => {
			return res.render("show", {pet});
		});
	})
	.patch((req, res, next) => {
		return Pet.findByIdAndUpdate(req.params.id, req.body).then(pet => {
			return res.redirect("/");
		});
	})
	.delete((req, res, next) => {
		return Pet.findByIdAndRemove(req.params.id).then(pet => {
			return res.redirect("/");
		});
	});

router.route("/:id/edit").get((req, res, next) => {
	return Pet.findById(req.params.id).then(pet => {
		return res.render("edit", {pet});
	});
});

module.exports = router;