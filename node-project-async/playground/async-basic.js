console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Second setTimeout');
}, 0);

setTimeout(() => {
  console.log('Third setTimeout');
}, 0);

console.log('Finishing up');
