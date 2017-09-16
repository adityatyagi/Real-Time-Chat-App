// this will run in the browser -> client side of the socket.io

$('document').ready(function() {

    // connect to the socket
    var socket = io();

    var msg = $('#text-message');
    var chatForm = $('#chatForm');
    var user = $('#user');



    $('form').submit(function() {
        var from = user.val();
        if (msg.val() != '') {
            socket.emit('chat message', from, msg.val());
        }
        msg.val(''); // clear the input so that the user can type a new message
        return false;
    });


    // getting the message back form the server and displaying it to client
    socket.on('chat message', function(from, msg) {
        var me = $('#user').val();
        var color = (from == me) ? 'green' : '#009afd';
        var from = (from == me) ? 'Me' : from;
        $('#messages').append('<li><strong style="color:' + color + '">' + from + '</strong>: ' + msg + '</li>');
        scrollBottom();
    });


    // message going on pressing enter but not in the same format.
    msg.keypress(function(e) {
        if (e.which == 13 && !e.shiftKey) {
            $(this).closest("form").submit();
            e.preventDefault();
            return false;
        }
    });


    // keeps the scroller at the bottom when new messages arrives
    function scrollBottom() {
        $(".chat-messages").animate({ scrollTop: $(document).height() }, "slow");
        return false;
    }

    // function to create random user-name
    var name = makeId();
    $('#user').val(name);
    // with the event: 'chat message', we have to pass (from, msg)i.e. 2 parameters and the server will handle the same
    socket.emit('chat message', 'System', '<strong>' + name + '</strong> has joined the conversation!');

});

function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text; // this text will be stored in the "name" variable in CREATE USERS -> document.ready
}