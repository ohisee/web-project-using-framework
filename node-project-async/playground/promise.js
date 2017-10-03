var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve('It worked');
//     reject('Unable to fulfill promise');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });

// asyncAdd(9, 7).then((result) => {
//   console.log(result);
//   return asyncAdd(result, 33);
// }, (errorMessage) => {
//   console.log(errorMessage);
// }).then((res) => {
//   console.log(res);
// }, (errorMessage) => {
//   console.log(errorMessage);
// });

asyncAdd(9, 7).then((result) => {
  console.log(result);
  return asyncAdd(result, 33);
}).then((res) => {
  console.log(res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
