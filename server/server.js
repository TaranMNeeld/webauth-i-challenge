const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./data/users/users-router.js');

const server = express();

const sessionConfig = {
    name: 'monkey', //Default name is sid
    secret: 'keep it secret, keep it safe!', //safer to set to an enviornment variable than a string
    cookie: {
        maxAge: 1000 * 60 * 60, //milliseconds
        ephemeral: false,
        secure: false, //true in production
        httpOnly: true //no javascript can access the cookies
    },
    resave: false,
    saveUninitialized: false //you must ask the user for permission to save cookies
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', userRouter);

module.exports = server;