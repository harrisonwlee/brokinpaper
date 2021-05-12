var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var timestamp = new Date();

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./dev-models");
db.mongoose
	.connect(db.url, {
    	useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
  	.then(() => {
		timestamp = new Date();
		console.log(timestamp.toUTCString() + ": Connected to the database successfully.");
  	})
  	.catch(err => {
    	console.log("ERR: Connection attempt to database failed. Error log >>>", err);
    	process.exit();
	});
	  
require("./dev-routes/dev-album.routes")(app);

const PORT = process.env.PORT || 8080;
var listener = app.listen(PORT, () => {
	timestamp = new Date();
  	console.log(timestamp.toUTCString() + `: DEVELOPMENT Server is running on port ${listener.address().port}.`);
});
