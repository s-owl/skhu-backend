var express = require('express');
var router = express.Router();

// POST - certificate
var certificate = require('./certificate');
router.post('/certificate', certificate);

module.exports = router;
