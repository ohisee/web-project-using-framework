'use strict';

/**
 * Geocode address
 */
var request = require('request');

var geocodeAddress = function geocodeAddress(address) {
  return new Promise(function (resolve, reject) {
    var encodedAddr = encodeURIComponent(address);
    request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddr,
      json: true
    }, function (error, response, body) {
      if (error) {
        reject('Unable to connect to servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find address');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

module.exports = {
  geocodeAddress: geocodeAddress
};