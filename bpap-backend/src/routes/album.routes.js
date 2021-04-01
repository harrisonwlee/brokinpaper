module.exports = app => {
	const albums = require("../controllers/album.controller.js");

  	var router = require("express").Router();

	// Retrieve all Tutorials
	router.get("/", albums.findAll);

	app.use("/api/albums", router);
};