var express = require("express");
var app = express();
var router = express.Router();
var favicon = require("serve-favicon");
var cfenv = require('cfenv');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views'); // defines where our HTML files are placed
app.set('view engine', 'ejs'); // used for HTML rendering
app.engine('html', require('ejs').__express); // rendering HTML files through EJS
require("./router/main.js")(app);
app.use(favicon(__dirname + '/public/logo-name/karime-name2.png'));

var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host 
app.listen(appEnv.port, '0.0.0.0', function() { // print a message when the server starts listening 
	console.log("server starting on " + appEnv.url); 
});