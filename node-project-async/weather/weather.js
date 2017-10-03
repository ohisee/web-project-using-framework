/**
 * Geocode weather
 */
const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/3c6900d8ed0910670e27c67bf6e36d43/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers.', undefined);
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch forecast.', undefined);
    }
  });
};

module.exports = {
  getWeather: getWeather
};
