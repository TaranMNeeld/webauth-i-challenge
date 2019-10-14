const db = require('../../db-config.js');

module.exports = {
    getUsers,
    authUser,
    addUser
};

function getUsers() {
    return db('users');
}

function getUserById(id) {
    return db('users')
    .where({id})
    .first();
}

function authUser(condition) {
    return db('users')
   .where(condition);
}

function addUser(user) {
    return db('users')
      .insert(user, 'id')
      .then(id => {
        return getUserById(id);
      });
  }