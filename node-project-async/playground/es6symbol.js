let symbol = Symbol('debug');
let anotherSymbol = Symbol('debug');
console.log(typeof symbol);
console.log(symbol == anotherSymbol);

let obj = {
  name: 'person',
  [symbol]: 100
};

console.log(obj[symbol]);

let symbol1 = Symbol.for('age');
let symbol2 = Symbol.for('age');
console.log(symbol1 == symbol2);

let person = {
  name: 'Max',
  age: 100
};

function makeAge(person) {
  let ageSymbol = Symbol.for('age');
  person[ageSymbol] = 27;
}

makeAge(person);

console.log(person[symbol1]);
console.log(person['age']);

class Person {}

Person.prototype[Symbol.toStringTag] = 'Person';

let pp = new Person();

console.log(pp);

let numbers = [1, 2, 3];

numbers[Symbol.toPrimitive] = function() {
  let r = 0;
  this.forEach((value) => r += value);
  return r;
}

console.log(numbers + 1);
