let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('Done!');
  }, 1500);
});

promise.then(function (value) {
  console.log(value)
}, function (error) {
  console.log(error);
});

function waitSomeSeconds(seconds) {
  return new Promise(function (resolve, reject) {
    if (seconds > 2) {
      reject('rejected!');
    } else {
      setTimeout(function () {
        seconds++;
        resolve(seconds);
      }, 1000)
    }
  });
}

waitSomeSeconds(2)
  .then(waitSomeSeconds)
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
    console.log(error);
  });


let promise1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('resolved--!');
  }, 1000);
});

let promise2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject('rejected--!');
  }, 2000);
});

// if one rejects, none will resolve
Promise.all([promise1, promise2])
  .then(function (success) {
    console.log(success);
  })
  .catch(function (error) {
    console.log(error);
  });

// wait for quickest promise to resolve, either resolve or reject
Promise.race([promise1, promise2])
  .then(function (success) {
    console.log(success);
  })
  .catch(function (error) {
    console.log(error);
  });