const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.get('/', (req, res) => {
    Users.getUsers()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(404).json({errorMessage: 'cannot get users from database'});
    })
}) 

module.exports = router;