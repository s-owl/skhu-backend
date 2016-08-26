var express = require('express');
var router = express.Router();

// POST - result
var result = require('./result');
router.post('/result', result);

// POST - history
var history = require('./history');
router.post('/history', history);

module.exports = router;
