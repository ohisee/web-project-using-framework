const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demandOption: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      type: 'string',
      string: true
    }
  })
  .check(function(argv, options) {
    if (argv.address === '') {
      throw new Error('Address is required');
    }
    return true;
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddr = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat,
      lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/3c6900d8ed0910670e27c67bf6e36d43/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Temperature ${temperature}, apparent temperature ${apparentTemperature}`);
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server');
  } else {
    console.log(error.message);
  }
});
