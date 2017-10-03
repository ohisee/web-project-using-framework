const utils = require('./utils');
const expect = require('expect');

describe('Verifying Utils', function () {
  it('should add two numbers', () => {
    var res = utils.add(33, 11);
    expect(res).toBe(44).toBeA('number');
    // if (res !== 44) {
    //   throw new Error(`Expected 44, but got ${res}`);
    // }
  });

  it('should square a number', () => {
    var res = utils.square(22);
    expect(res).toBe(484).toBeA('number');
  });

  it('should verify first and last name set', () => {
    var user = {
      name: 'person',
      age: 100
    };
    var res = utils.setName(user, 'running man');
    expect(res)
      .toBeA('object')
      .toInclude({firstName: 'running', lastName: 'man'});
  });

});

describe('Verifying Async', function () {
  it('should async add two numbers', (done) => {
    var res = utils.asyncAdd(3, 6, (sum) => {
      expect(sum).toBe(9).toBeA('number');
      done();
    });
  }).timeout(5000);

  it('should async square a number', (done) => {
    var res = utils.asyncSquare(3, (sqr) => {
      expect(sqr).toBe(9).toBeA('number');
      done();
    });
  }).timeout(2000);
});

describe('Verifying Objects', function () {
  it('should expect some values', () => {
    expect({name: 'person'}).toEqual({name: 'person'});
    expect({name: 'person'}).toNotEqual({name: 'Person'});
  });
});

describe('Verifying to not be', function () {
  it('should expect some values', () => {
    expect(12).toNotBe(11);
  });
});

describe('Verifying include and exclude', function () {
  it('should expect some values', () => {
    expect([1, 2, 3, 5, 0]).toInclude(5);
    expect([1, 2, 3, 5, 0]).toExclude(9);
  });
  
  it('should expect some values', () => {
    expect({
      name: 'person',
      age: 100,
      locaton: 'Sunnyvale'
    }).toInclude({
      age: 100
    }).toExclude({
      age: 101
    });
  });
});
