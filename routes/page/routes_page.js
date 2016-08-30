var express = require('express');
var router = express.Router();

// POST - YLLABUS_DETAILS
var syllabus_details = require('./syllabus_details');
router.post('/syllabus_details', syllabus_details);

module.exports = router;
