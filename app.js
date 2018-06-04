const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const morgan = require("morgan");
app.use(morgan("tiny"));

const { petRouter } = require("./routes");
app.use("/pets", petRouter);

app.get("/", (req, res, next) => {
	return res.redirect("/pets");
});

app.use((req, res, next) => {
	const err = new Error("Page Not Found");
	err.status = 404;
	return net(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	return res.render("error", {
		message: err.message,
		error: app.get("env") === "development" ? err : {}
	});
});

app.listen(3000, () => {
	console.log("Server Runnin, head over to port 3000");
});