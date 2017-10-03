const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Person A',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Person B',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Person C',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Person',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user).toExist();
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user).toExist();
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should be names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Person A', 'Person C']);
  });

  it('should be names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Person B']);
  });

  it('should find user name', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Person CCC',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.checkUserName(user.name, user.room)).toBe(true);
  });

  it('should not find user name', () => {
    expect(users.checkUserName('Person BBB', 'Node Course')).toBe(false);
  });

});
