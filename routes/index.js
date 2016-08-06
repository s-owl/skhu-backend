var express = require('express');
var router = express.Router();

// Load Functions
var login = require('./login');

router.get('/', function(req, res, next){
  res.send("Node.js based Forest Middleman Server.")
})

// POST Login
router.post('/login', function(req, res, next) {login(req, res, next);});

module.exports = router;
