var express = require('express');
var router = express.Router();

var smsServer = require('./../models/sms-server');

var BAD_REQUEST_CODE = 400;
var INTERNAL_SERVER_ERROR = 500;
var NOT_FOUND = 404;

router.post('/send', function(req, res, next) {
  var phone = req.body.phone;
  var text = req.body.text;

  if (phone === undefined) {
    return res.status(BAD_REQUEST_CODE).send('Argument doesn\'t exist: phone');
  }

  if (text === undefined) {
    return res.status(BAD_REQUEST_CODE).send('Argument doesn\'t exist: text');
  }

  try {
    smsServer.sendSms(phone, text);
    res.send('ok');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send('Exception while sending sms: ' + e);
  }
});

router.get('/isAskedToSendSms', function(req, res, next) {
  var phone = req.query.phone;

  if (phone === undefined) {
    return res.status(BAD_REQUEST_CODE).send('Query parameter doesn\'t exist: phone');
  }

  try {
    var result = smsServer.isAskedToSendSms(phone);

    if (result.error) {
      return res.status(NOT_FOUND).send(result);
    }
    
    return res.json(result);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send('Exception while isAskedToSendSms sms: ' + e);
  }
});

module.exports = router;


