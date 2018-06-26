const express = require('express');
const router = express.Router({ mergeParams: true});

const { Owner, Pet } = require("../models");

router
	.route("/")
	.get((req, res, next) => {
		return Owner.findById(req.params.owner_id)
			.populate("pets")
			.exec()
			.then(owner => {
				return res.render("pets/index", { owner });
			});
	})
	.post((req, res, next) => {
		const newPet = new Pet(req.body);
		const { ownerId } = req.params;
		newPet.owner = ownerId;
		return newPet
			.save()
			.then(pet => {
				return Owner.findByIdAndUpdate(
					ownerId,
					{ $addToSet: { pets: pet._id } }
				);
			})
			.then(() => {
				return res.redirect(`/owner/${ownerId}/pets`);
			});
	});

router.route("/new").get((req, res, next) => {
	return res.render("new");
});

router
	.route("/:petId")
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

router.route("/:petId/edit").get((req, res, next) => {
	return Pet.findById(req.params.id).then(pet => {
		return res.render("edit", {pet});
	});
});

module.exports = router;