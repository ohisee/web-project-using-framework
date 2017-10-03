var moment = require('moment');
// Jan 1st 1970 00:00:00 am the epoch -> time stamp 0

var date = moment();
date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM do, YYYY'));

var date2 = moment();
console.log(date2.format('h:mm a'));

var someTimestampe = moment().valueOf();

var uobj = {};

uobj['person a'] = 'peson a';
uobj['person b'] = 'peson b';
uobj['person c'] = 'peson c';

console.log(uobj);
console.log(uobj['person a']);
