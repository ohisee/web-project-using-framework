'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var a = {
  name: 'a person',
  description: 'something',
  age: 100,
  speed: 19.18
};

var c = {
  name: 'c',
  description: 'c',
  age: 12,
  property: true
};

var b = _extends({}, a, c);

console.log('See', b);