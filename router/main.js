// module.exports exposes functions that we want to use in a different file
module.exports = function(app) {

	app.get("/", function(req, res){
		res.render("index.html");
	});

	app.get("/about", function(req, res){
		res.render("about.html");
	});

	app.get("/art", function(req, res){
		res.render("about.html");
	});

	// making a request to retrieve quote
	app.get("/verse", function(req, res){
		var request = require('request');
		console.log("Retrieving verse...");
		request('http://www.ourmanna.com/verses/api/get/?format=text', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).send(body);
            } else{
            	console.error("There was an error in the request.");
            	console.error(error);
            } 
        });
	});

	app.get("*", function(req, res){
		res.status(404).json({ error: 'not found' });
	});
}

