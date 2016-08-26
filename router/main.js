// module.exports exposes functions that we want to use in a different file
module.exports = function(app) {

	app.get("/", function(req, res){
		res.render("index.html");
	});

	app.get("/about", function(req, res){
		res.render("about.html");
	});

	app.get("*", function(req, res){
		res.status(400).json({ error: 'message' });
	});
}

