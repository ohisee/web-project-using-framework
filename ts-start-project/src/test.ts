import * as request from 'request';
import { Observable, Observer } from 'rxjs/Rx';

let str = 'hello world';

console.log(str);

function geo() : Observable<any> {
  let encodedAddr = encodeURIComponent('san francisco');
  return Observable.create((observer: Observer<any>) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        observer.error(error);
      } else if (body.status === 'OK') {
        observer.next(body);
      } else if (body.status === undefined) {
        observer.error('Encountered error');
      }
      observer.complete();
    });
  });
}

let geo$ = geo();

geo$.map(
  (httpBody) => {
    return httpBody.results[0].formatted_address;
  }
).subscribe(
  (geo) => {
    console.log('GEO', geo);
  },
  (error) => {
    console.log('Error', error)
  },
  () => {}
);

