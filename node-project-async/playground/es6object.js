var obj1 = {
  a: 1
};

var obj2 = {
  b: 2
};

var obj = Object.assign(obj1, obj2);

console.log(obj);

let name = 'abcopqpqoerkqwepqwej';

console.log(name.endsWith('j'));

let number = Infinity;

console.log(Number.isFinite(number));
console.log(Number.isInteger(number));

let array = Array(5);
console.log(array);

let array1 = Array.of(5, 10, 11);
console.log(array1);

let newArray = Array.from([10, 12, 16], (value) => {value * 2});
console.log(newArray);

console.log([10, 12, 16].fill(100, 0, 2));

console.log([10, 12, 16].find(val => val >= 12));

console.log([1, 2, 3].copyWithin(1, 2));

let ar1 = [1, 2, 3];
let it1 = ar1.entries();
for (let element of it1) {
  console.log(element);
}
