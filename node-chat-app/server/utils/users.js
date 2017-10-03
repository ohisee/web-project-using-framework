class Users {
  constructor() {
    this.users = [];
    this.usernames = {};
  }

  /**
   * Add user
   * @param id
   * @param name
   * @param room
   */
  addUser(id, name, room) {
    var user = {
      id, name, room
    };
    this.users.push(user);
    this.usernames[`${name}`] = user;
    return user;
  }

  /**
   * Remove user
   * @param id - user id
   */
  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }
    return user;
  }

  /**
   * Get a user
   * @param id - user id
   */
  getUser(id) {
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }

  /**
   * Check existence of user name
   * @param name - name
   */
  checkUserName(name, room) {
    var lookupUser = this.users.filter((user) => {
      return user.name === name && user.room === room;
    })[0];
    return (lookupUser) ? true : false;
  }

  /**
   * Get user list
   * @param room - user room
   */
  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {
  Users: Users
};
