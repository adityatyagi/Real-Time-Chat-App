var socket = io();

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user); // notifyUser is the event that the server side code identifies => runs the listner
}

socket.on('notifyUser', function(user) {
    var me = $('#user').val();
    if (user != me) {
        $('#notifyUser').text(user + 'is typing...');
    }
    setTimeout(function() {
        $('#notifyUser').text('');
    }, 4000);
});