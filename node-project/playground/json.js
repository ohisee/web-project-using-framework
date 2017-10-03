var obj = {
  name: 'Person'
};
var stringObj = JSON.stringify(obj);
console.log(typeof stringObj);
console.log(stringObj);

var personString = '{"name": "Person", "age": 100}';
var personObj = JSON.parse(personString);
console.log(typeof personObj);
console.log(personObj);
