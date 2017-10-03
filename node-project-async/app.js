const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(weatherResults);
      }
    });
  }
});
