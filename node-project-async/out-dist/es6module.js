'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;
var keyValue = exports.keyValue = 1001;

function test() {
  exports.keyValue = keyValue = 2000;
  return 'tested';
}

var ab = 'Some text';

exports.default = ab;

// or
// export {keyValue, test};