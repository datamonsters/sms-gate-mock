var express = require('express');
var router = express.Router();

var smsServer = require('./../models/sms-server');

/* GET home page. */
router.get('/', function(req, res, next) {
  var phones = smsServer.getRecords();
  res.render('index', { phones: phones });
});

module.exports = router;
