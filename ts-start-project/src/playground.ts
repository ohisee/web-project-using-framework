import * as request from 'request';

function geo() {
  let encodedAddr = encodeURIComponent('san francisco');
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('Error', error);
    } else if (body.status === 'OK') {
      console.log(body.results[0].formatted_address);
    } else if (body.status === undefined) {
      console.log('Error');
    }
  });
}

geo();