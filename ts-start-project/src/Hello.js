"use strict";
exports.__esModule = true;
/**
 * Typescript class
 */
var Hello = (function () {
    function Hello(_title) {
        this._title = _title;
    }
    Object.defineProperty(Hello.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
        },
        enumerable: true,
        configurable: true
    });
    return Hello;
}());
// try other types
var a;
a = ['1', '2'];
var b;
b = new Hello('www');
var RunningCar = {
    accelerate: function (speed) {
    }
};
var n;
n = [1, 2, 3];
var ExportedClass = (function () {
    function ExportedClass() {
        this.name = 'abc';
    }
    return ExportedClass;
}());
exports.ExportedClass = ExportedClass;
