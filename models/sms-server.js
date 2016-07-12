var SmsServer = function() {

  var phones = {};

  this.sendSms = function(phone, text) {
    var DAY = 24 * 60 * 60 * 1000;
    var clearPhone = function() {
      delete phones[phone];
    };

    phones[phone] = {
      text: text,
      time: Date.now(),
      timer: setTimeout(clearPhone, DAY)
    };
  };

  this.isAskedToSendSms = function(phone) {
    var phoneNote = phones[phone];

    if (phoneNote) {
      return {
        text: phoneNote.text,
        time: phoneNote.time.toString()
      }
    }

    return {
      error: 'phone doesn\'t asked'
    };
  };

  this.getRecords = function() {
    var records = [];
    for(var phone in phones) {
      var record = phones[phone];
      records.push({
        phone: phone,
        text: record.text,
        time: record.time
      });
    }
    return records.sort(function(left, right) {
      return right.time - left.time;
    });
  };
};

module.exports = new SmsServer();
