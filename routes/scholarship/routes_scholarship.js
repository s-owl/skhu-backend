var express = require('express');
var router = express.Router();

// POST - result
var result = require('./result');
router.post('/result', result);

module.exports = router;
