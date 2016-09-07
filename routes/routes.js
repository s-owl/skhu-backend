
var express = require('express');
var router = express.Router();

// "/" will display some information about this server
var serverinfo = require('./serverinfo');
router.get('/', serverinfo);

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

// grade
var grade = require('./grade/routes_grade');
router.use('/grade', grade);

// page
var page = require('./page/routes_page');
router.use('/page', page);

module.exports = router;
