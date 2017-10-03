/*
 * Run in browser
 */
var socket = io();

function scrollToBottom () {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

function chatAlert(message, redirect) {
  jQuery('#alertModal').on('shown.bs.modal', function() {
    $(this).find('.modal-body p').text(message);
  });
  jQuery('#alertModal').modal('show');
  jQuery('#alertModal').on('hidden.bs.modal', function() {
    if (redirect) {
      window.location.href = '/';
    }
  });
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(error) {
    if (error) {
      chatAlert(error, true);
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

// var li = jQuery('<li></li>');
// li.text(message.from + ' ' + formattedTime + ': ' + message.text);
// jQuery('#messages').append(li);
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// var li = jQuery('<li></li>');
// var a = jQuery('<a target="_blank">My current location</a>');
// li.text(message.from + ' ' + formattedTime + ': ');
// a.attr('href', message.url);
// li.append(a);
// jQuery('#messages').append(li);
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// socket.emit('createMessage', {
//   from: 'Person',
//   text: 'how are you'
// }, function(data) {
//   console.log('received', data);
// });
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return chatAlert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending locaton...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Sending locaton');
    socket.emit('createdLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Sending locaton');
    chatAlert('Unable to fetch location');
  });

});
