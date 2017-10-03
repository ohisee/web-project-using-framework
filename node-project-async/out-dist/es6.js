'use strict';

var _console;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var name = 'person';
var namerun = 'person again';

console.log(name);
console.log(namerun);

var obj = {
  age: 100
};

console.log(obj);

obj.age = 101;

console.log(obj);

var fn = function fn() {
  return 'hello';
};

var fnn = function fnn() {
  var a = 2;
  var b = 5;
  return a + b;
};

var fo = function fo(a, b) {
  return a + b;
};

var foo = function foo(a) {
  return a + 5;
}; // one argument

console.log(fn());

setTimeout(function () {
  return console.log('hello after 1 sec');
}, 1000);

function isEqualTo(number) {
  var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10 / 5;

  return number == compare;
}

function isEqualTo2(number) {
  var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : number;

  return number == compare;
}

console.log(isEqualTo());
console.log(isEqualTo2());

var str = 'per';
var num = 200;
var numField = 'see';

var obj2 = _defineProperty({
  str: str,
  num: num,
  greet: function greet() {
    return this.str + ', ' + this.num;
  },
  'greet again': function greetAgain() {
    console.log('from greet again' + this.str + ', ' + this.num);
  }
}, numField, 100);

console.log(obj2);
obj2['greet again']();
console.log(obj2[numField]);

function sumUp() {
  for (var _len = arguments.length, toAdd = Array(_len), _key = 0; _key < _len; _key++) {
    toAdd[_key] = arguments[_key];
  }

  // rest operator
  console.log(toAdd);
}

sumUp(100, 10, 20);

var numbers = [1, 2, 3, 4, 5];
(_console = console).log.apply(_console, numbers); // spread operator
console.log(Math.max.apply(Math, numbers)); // spread operator

function checkSpread(a) {
  console.log('Spread', a);
}

checkSpread.apply(undefined, numbers);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = numbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var n = _step.value;

    console.log('looping', n);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var description = '\n  like this ' + (numField + ' now') + '\n  like this ${numField + \' now\'}\n';

console.log(description);

var c = numbers[0],
    d = numbers[1];


console.log(c);
console.log(d);

var w = numbers[0],
    z = numbers.slice(1);


console.log(w);
console.log(z);

var _numbers$ = numbers[0],
    w1 = _numbers$ === undefined ? 'not' : _numbers$,
    w2 = numbers[1],
    w3 = numbers[2],
    w4 = numbers[3],
    w5 = numbers[4],
    _numbers$2 = numbers[5],
    w6 = _numbers$2 === undefined ? 'new' : _numbers$2;


console.log(w1);
console.log(w6);

var z1 = 7;
var z2 = 9;

var _ref = [z2, z1];
z1 = _ref[0];
z2 = _ref[1];


console.log(z1);
console.log(z2);

// object destructure

var perObj = {
  perObjname: 'person',
  perObjage: 100,
  greet: function greet() {
    return 'hello how are you';
  }
};

var perObjname = perObj.perObjname,
    perObjage = perObj.perObjage,
    greet = perObj.greet;


console.log(perObjname, perObjage);

console.log(greet());

var hello = perObj.greet; // alias

console.log(hello());