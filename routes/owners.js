const express = require('express');
const router = express.Router();

const {Owner} = require("../models");

router
	.route("/")
	.get((req, res, next) => {
		return Owner.find().then(owners => {
			console.log(owners);
			return res.render('index', {owners, resource: "Owner"});
		});
	})
	.post((req, res, next) => {
		return Owner.create(req.body).then(() => {
			return res.redirect("/")
		})
	});

router.route("/new").get((req, res, next) => {
	return res.render("new", {resource: "Owner"});
});

router
	.route("/:ownerId")
	.get((req, res, next) => {
		return Owner.findById(req.params.ownerId).then(owner => {
			console.log(owner);
			return res.render("show", {owner});
		});
	})
	.patch((req, res, next) => {
		return Owner.findByIdAndUpdate(req.params.ownerId, req.body).then(() => {
			return res.redirect("/");
		})
	})
	.delete((req, res, next) => {
		return Owner.findByIdAndRemove(req.params.ownerId).then(() => {
			return res.redirect("/");
		});
	});

router.route("/:ownerId/edit").get((req, res, next) => {
	return Owner.findById(req.params.ownerId).then(owner => {
		return res.render("edit", {owner});
	});
});

module.exports = router;