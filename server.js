var express = require('express');
var app = express();

var port = process.env.PORT || 4000;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.
var io = require('socket.io').listen(app.listen(port));


// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./app/routes/routes')(app, io);

console.log('Your application is running on http://localhost:' + port);