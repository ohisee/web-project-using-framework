// var square = (x) => {
//   var result = x * x;
//   return result;
// };

//var square = (x) => x * x;

var square = x => x * x;
console.log(square(9));

var user = {
  name: 'Person',
  sayHi: () => {
    console.log(arguments); // not working with arguments
    console.log(`Hi, ${this.name}`); // not working with this
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi, ${this.name}`);
  }
};

user.sayHi();
user.sayHiAlt();
