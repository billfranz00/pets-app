// Express
const express = require("express");
const app = express();

// Collection of data on Post/Patch Requests
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Allows for patch and delete requests
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Logging requests
const morgan = require("morgan");
app.use(morgan("tiny"));

// View Engine
app.set("view engine", "pug");

// Route Handling
const { ownerRouter, petRouter } = require("./routes");
app.use("/owner", ownerRouter);
app.use("/owner/:ownerId/pets", petRouter);

// Homepage
app.get("/", (req, res, next) => {
	return res.redirect("/pets");
});

// 404 Response
app.use((req, res, next) => {
	const err = new Error("Page Not Found");
	err.status = 404;
	return next(err);
});

// Error Handling
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	return res.render("error", {
		message: err.message,
		error: app.get("env") === "development" ? err : {}
	});
});

// Run Server
app.listen(3000, () => {
	console.log("Server Runnin, head over to port 3000");
});