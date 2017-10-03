class Person {
  constructor(name) {
    this.name = name;
  }
}

function TopObj () {
  this.age = 100;
}

let person = Reflect.construct(Person, ['Person Name'], TopObj);

console.log(person);
console.log(person instanceof Person);
console.log(person.__proto == Person.prototype);
console.log(person.__proto == TopObj.prototype);
