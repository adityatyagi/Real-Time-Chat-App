// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function(app, io) {

    app.get('/', function(req, res) {
        // Render views/home.html
        res.render('home');
    });

    app.get('/chat', function(req, res) {
        // Render views/chat.html
        res.render('chat');
    });

    io.on('connection', function(socket) {

        console.log('A new user is connected'); // new user is connected

        socket.on('chat message', function(from, msg) {
            //broadcasting the message, including the sender: we use .emit() to broadcast message back to the html->frontend(client)
            io.emit('chat message', from, msg);
        });

        socket.on('notifyUser', function(user) {
            io.emit('notifyUser', user);
        });


        socket.on('disconnect', function() {
            console.log('User Disconnected!'); // the user either refreshes the page : disconnect and the re-connect, or user closes the tab
        });
    });

};