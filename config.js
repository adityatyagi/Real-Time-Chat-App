// This file handles the configuration of the app.
// It is required by server.js

var express = require('express');
var ejs = require('ejs');

module.exports = function(app, io) {

    // set .html as the default template extention
    app.set('view engine', 'html');

    // Initialize the ejs template engine
    app.engine('html', ejs.renderFile);

    // Tell express where it can find the templates
    app.set('views', __dirname + '/views');

    // Make the files in the public folder available to the world
    app.use(express.static(__dirname + '/public'));

};