var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
	.connect(db.url, {
    	useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
  	.then(() => {
    	console.log("Connected to the database successfully.");
  	})
  	.catch(err => {
    	console.log("ERR: Connection attempt to database failed. Error log >>>", err);
    	process.exit();
	});
	  
require("./routes/album.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  	console.log(`Server is running on port ${PORT}.`);
});
