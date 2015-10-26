var request = require('supertest');
var assert = require('assert');

var app = require('../app.js');

describe('POST /sms/send', function(){
  it('should throw 400 BAD REQUEST if phone doesn\'t exist', function(done){
    request(app)
      .post('/sms/send')
      .type('form')
      .send({'text': '3456'})
      .expect(400, 'Argument doesn\'t exist: phone', done);
  })

  it('should throw 400 BAD REQUEST if text doesn\'t exist', function(done){
    request(app)
      .post('/sms/send')
      .type('form')
      .send({'phone': '456546'})
      .expect(400, 'Argument doesn\'t exist: text', done);
  })

  it('should 200 OK if text and phone exist', function(done){
    request(app)
      .post('/sms/send')
      .type('form')
      .send({'phone': '456546', 'text': '123123'})
      .expect(200, 'ok', done);
  })
})

describe('GET /sms/isAskedToSendSms', function(){
  it('should throw 400 BAD REQUEST if phone parameter value doesn\'t exist', function(done){
    request(app)
      .get('/sms/isAskedToSendSms')
      .expect(400, 'Query parameter doesn\'t exist: phone', done);
  })
})

describe('SMS Server', function(){
  var getRandomPhone = function() {
    return Math.round(Math.random() * 10000000 + 10000000);
  };

  var getRandomText = function() {
     return Math.round(Math.random() * 8999 + 1000);
  };

  describe('Correct usage', function() {
    var phone = getRandomPhone();
    var text = getRandomText();

    before(function(done) {
      request(app)
        .post('/sms/send')
        .type('form')
        .send({'phone': phone, 'text': text})
        .expect(200, 'ok', done)
    })

    it('should get right code for used phone', function(done) {
      request(app)
        .get('/sms/isAskedToSendSms?phone=' + phone)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert.equal(res.body.text, text, "Result sms text doesn\'t equals to requested text");
        })
        .expect(200, done);
    })

    it('should get error for unused phone', function(done) {
      request(app)
        .get('/sms/isAskedToSendSms?phone=' + getRandomPhone())
        .expect('Content-Type', /json/)
        .expect(404, {
          error: 'phone doesn\'t asked'
        }, done);
    })
  })
})


