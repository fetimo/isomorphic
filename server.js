// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express'),
    path = require('path');

var app = express();
// Make sure to include the JSX transpiler
require("node-jsx").install();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// Set up Routes for the application
require('./routes.js')(app);

app.listen(3000);

console.log('Server is running at Port: ' + 3000);
