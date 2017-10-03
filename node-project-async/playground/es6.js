var name = 'person';
let namerun = 'person again';

console.log(name);
console.log(namerun);

const obj = {
  age: 100
};

console.log(obj);

obj.age = 101;

console.log(obj);

var fn = () => 'hello';

var fnn = () => {
  let a = 2;
  let b = 5;
  return a + b;
}

var fo = (a, b) => a + b;

var foo = a => a + 5; // one argument

console.log(fn());

setTimeout(() => console.log('hello after 1 sec'), 1000);

function isEqualTo(number, compare = 10 / 5) {
  return number == compare;
}

function isEqualTo2(number, compare = number) {
  return number == compare;
}

console.log(isEqualTo());
console.log(isEqualTo2());

let str = 'per';
let num = 200;
let numField = 'see'

let obj2 = {
  str,
  num,
  greet() {
    return this.str + ', ' + this.num;
  },

  'greet again'() {
    console.log('from greet again' + this.str + ', ' + this.num);
  },

  [numField]: 100
};

console.log(obj2);
obj2['greet again']();
console.log(obj2[numField]);

function sumUp(...toAdd) { // rest operator
  console.log(toAdd);
}

sumUp(100, 10, 20);

let numbers = [1, 2, 3, 4, 5];
console.log(...numbers); // spread operator
console.log(Math.max(...numbers)); // spread operator

function checkSpread(a) {
  console.log('Spread', a);
}

checkSpread(...numbers);

for (let n of numbers) {
  console.log('looping', n);
}

let description = `
  like this ${numField + ' now'}
  like this \${numField + ' now'}
`;

console.log(description);

let [c, d] = numbers;

console.log(c);
console.log(d);

let [w, ...z] = numbers;

console.log(w);
console.log(z);

let [w1 = 'not', w2, w3, w4, w5, w6 = 'new'] = numbers;

console.log(w1);
console.log(w6);

let z1 = 7;
let z2 = 9;

[z1, z2] = [z2, z1];

console.log(z1);
console.log(z2);

// object destructure

let perObj = {
  perObjname: 'person',
  perObjage: 100,
  greet: function () {
    return 'hello how are you';
  }
};

let { perObjname, perObjage, greet } = perObj;

console.log(perObjname, perObjage);

console.log(greet());

let { greet: hello } = perObj; // alias

console.log(hello());

