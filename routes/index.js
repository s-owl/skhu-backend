var express = require('express');
var router = express.Router();

// POST - LOGIN
var login = require('./login');
router.post('/login', login);

// POST - URL
var url = require('./url');
router.post('/url', url);

// POST - MAIN
var main = require('./main');
router.post('/main', main);

module.exports = router;
