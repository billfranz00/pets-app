const express = require('express');
const router = express.Router();

const {Owner} = require("../models");

router
	.route("/")
	.get((req, res, next) => {
		return Owner.find().then(owners => {
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
		return Owner.findById(req.params.id).then(owner => {
			return res.render("show", {owner});
		});
	})
	.patch((req, res, next) => {
		return Owner.findByIdAndUpdate(req.params.id, req.body).then(() => {
			return res.redirect("/");
		})
	})
	.delete((req, res, next) => {
		return Owner.findByIdAndRemove(req.params.id).then(() => {
			return res.redirect("/");
		});
	});

router.route("/:ownerId/edit").get((req, res, next) => {
	return Owner.findById(req.params.id).then(owner => {
		return res.render("edit", {owner});
	});
});

module.exports = router;