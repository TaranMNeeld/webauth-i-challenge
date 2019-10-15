const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

const router = express.Router();

router.post('/register', validateUserData, (req, res) => {
    const userData = req.body;
    const hash = bcrypt.hashSync(userData.password, 12);
    userData.password = hash;
    Users.addUser(userData)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(404).json({ errorMessage: 'cannot post user to database' });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.authUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(201).json({ message: `Welcome, ${username}` });
            } else {
                res.status(400).json({ errorMessage: 'invalid user credentials' })
            }
        })
        .catch(err => {
            res.status(400).json({ errorMessage: 'login failed' })
        })
})

router.get('/logout', (req, res) => {
    if (req.session) { 
        req.session.destroy(err => {
            if (err) {
                res.json({message: 'unable to logout'});
            } else {
                console.log(req.session)
                res.status(200).json({message: 'logout succesful'});
            }
        })
    } else {
        res.status(200).json({message: 'you are not logged in yet'});
    }
})

router.get('/users', restricted, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(404).json({ errorMessage: 'cannot get users from database' });
        })
})

//Middleware

function restricted(req, res, next) {
    if (req.session && req.session.user) {
        console.log('already logged in');
    } else {
        res.status(400).json({ errorMessage: 'You shall not pass' })
    }
    next();
}

function validateUserData(req, res, next) {
    const userData = req.body;
    if (!userData.username) {
        res.status(400).json({ errorMessage: 'missing required username field' })
    } else if (!userData.password) {
        res.status(400).json({ errorMessage: 'missing required password field' })
    } else {
        console.log('user validated');
        next();
    }
}

module.exports = router;