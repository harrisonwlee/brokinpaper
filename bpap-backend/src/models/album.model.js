module.exports = mongoose => {
  	const Album = mongoose.model(
    	"album",
    	mongoose.Schema(
      	{
			title: String,
			release_date: Date,
			urls: Object
		},
		)
	);
	return Album;
};