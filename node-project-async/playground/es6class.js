class Helper {
  static logTwice(message) {
    console.log(message);
    console.log(message);
  }
}

class Person {

  constructor(description) {
    this._name = 'person name ' + description;
  }

  greet() {
    console.log('hello, how are you ' + this._name + ' and age is ' + this.age);
  }

  get name() {
    return this._name.toUpperCase();
  }

  set name(value) {
    this._name = value;
  }
}

class Max extends Person {
  constructor(age) {
    super('Max');
    this.age = age;
  }

  greet() {
    console.log('hello!');
  }

  greetTwice() {
    this.greet();
    super.greet();
  }

}

class ConvertableArray extends Array {
  convert() {
    let returnArray = [];
    this.forEach((value) => {
      returnArray.push('converted! ' + value);
    });
    return returnArray;
  }
}

let person = new Person('are you doing something');

person.greet();

console.log(person.__proto__ === Person.prototype);

let max = new Max(100);

max.greetTwice();

console.log(max.__proto__ === Person.prototype);

Helper.logTwice('logged');

let numberArray = new ConvertableArray();
numberArray.push(1);
numberArray.push(2);
numberArray.push(3);
console.log(numberArray.convert());
