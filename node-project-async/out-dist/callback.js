'use strict';

var getUser = function getUser(id, callback) {
  var user = {
    id: id,
    name: 'Person'
  };

  setTimeout(function () {
    callback(user);
  }, 3000);
};

getUser(31, function (userObject) {
  console.log(userObject);
});