const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {

  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Person', 100);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Person', 100);
  });

  it('should call saveUser with user object', () => {
    var email = 'person@walking.com';
    var password = '123abc';
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });

});
