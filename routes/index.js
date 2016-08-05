var express = require('express');
var router = express.Router();

// Load Functions
var login = require('./login');

// POST Login
router.post('/login', function(req, res, next) {login(req, res, next);});

module.exports = router;
