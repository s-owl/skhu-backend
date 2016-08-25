
var express = require('express');
var router = express.Router();

// USER
var user = require('./user/routes_user');
router.use('/user', user);

// CLASS
var classs = require('./class/routes_class');
router.use('/class', classs);

// enroll
var enroll = require('./enroll/routes_enroll');
router.use('/enroll', enroll);

// SCHOLARSHIP
var scholarship = require('./scholarship/routes_scholarship');
router.use('/scholarship', scholarship);

module.exports = router;
