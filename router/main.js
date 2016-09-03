// module.exports exposes functions that we want to use in a different file
module.exports = function(app) {

	var config = require('config');

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

	app.post("/contact", function(req, res){
		var name = req.body.name || null,
			email = req.body.email || null,
			phone = req.body.phone || null,
			message = req.body.message || null;

		var cfenv = require('cfenv'),
			appEnv = cfenv.getAppEnv(),
			privateConfig = require("../config/private.json");

		if(!(!!name && !!email && !!phone && !!message)){
			let errMessage = "Did not provide all required inputs.";
			console.error(errMessage);
			return res.status(400).send(errMessage);
		}

		console.log("Message received from: "+ name);
		console.log("Email: " + email);
		console.log("Phone: " + phone);
		console.log("Message: " + message);

		var username,
			password;
		if(appEnv.isLocal){
			// These environment variables exist on local drive, NOT on github
			username = privateConfig.sendgrid.credentials.username;
			password = privateConfig.sendgrid.credentials.password;
		}else{
			// These environment variables exist on BlueMix
			username = process.env.cloudantUsername;
			password = process.env.cloudantPassword;
		}

		const sendgridemail = "karime.saad@utexas.edu";
		const sendgrid = require('sendgrid')(username, password);

		sendgrid.send({
		    to: sendgridemail,
		    from: name,
		    subject: "Website Message from " + name,
		    text: `Name:${name}, Phone Number: ${phone}, E-mail Address: ${email}, Message: ${message}.`,
		    html: `<b>Name:</b> ${name} <br> <b>Phone number:</b> ${phone} <br><b>E-mail address:</b>${email}<br><b> Message:</b>${message}`

		}, function(err, json) {
		    if (err) {
		        console.error(err);
		        return res.status(400).send(err);
		    }
		    return res.sendStatus(200);
		});
	});



	app.get("*", function(req, res){
		res.status(404).json({ error: 'not found' });
	});
}

