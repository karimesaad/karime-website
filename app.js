var express = require("express");
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views'); // defines where our HTML files are placed
app.set('view engine', 'ejs'); // used for HTML rendering
app.engine('html', require('ejs').__express); // rendering HTML files through EJS
require("./router/main.js")(app);

var port = 3000;
app.listen(port);
console.log("server is running in port localhost:" + port);
var request = require('request');
console.log("Fetching data from ourmanna...");
request('http://www.ourmanna.com/verses/api/get/?format=text', function(error, response, body) {
			//console.log(error);
			//console.log(response);
			//console.log(body); 
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the Google homepage. 
            } 
        })