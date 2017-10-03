let a = {
  name: 'a person',
  description: 'something',
  age: 100,
  speed: 19.18
};

let c = {
  name: 'c',
  description: 'c',
  age: 12,
  property: true
};

let b = {...a, ...c};

console.log('See', b);