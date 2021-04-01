const db = require("../models");
const Album = db.albums;

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Album.find(condition)
    .then(data => {
      	res.send(data);
    })
    .catch(err => {
		res.status(500).send({
        	message: err.message || "Some error occurred while retrieving tutorials."
      	});
	});
};