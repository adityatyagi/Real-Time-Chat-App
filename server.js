var app = require('express')();
// app becomes the function handler here which we can supply to the http server
var http = require('http').Server(app);

// initialize a new instance of socket.io by passing the http (the HTTP server) object.
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));
// routes for the home-page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//  listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket) {

    console.log('A new user is connected'); // new user is connected

    socket.on('chat message', function(msg) {
        //console.log('Message: ' + msg);

        //broadcasting the message, including the sender: we use .emit() to broadcast message back to the html->frontend(client)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('User Disconnected!'); // the user either refreshes the page : disconnect and the re-connect, or user closes the tab
    });
});


// when the user types in a message, the server gets it as a "chat message" event. 

http.listen(app.get('port'), function() {
    console.log('The application is running on port ' + app.get('port'));
});