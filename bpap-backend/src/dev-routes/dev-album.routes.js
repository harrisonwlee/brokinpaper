module.exports = app => {
	const albums = require("../dev-controllers/dev-album.controller.js");
	var router = require("express").Router();
		  
	router.get("/", albums.findAll);
	app.use("/api/albums", router);
};