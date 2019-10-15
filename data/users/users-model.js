const db = require('../../db-config.js');

module.exports = {
    getUsers,
    authUser,
    addUser
};

function getUsers() {
    return db('users');
}

function authUser(condition) {
    return db('users')
        .where(condition)
        .first();
}

function addUser(user) {
    return db('users')
        .insert(user, 'id')
}