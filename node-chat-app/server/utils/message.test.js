var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'person';
    var text = 'hello, how are you';
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from: from,
      text: text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'person';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from: from,
      url: url
    });
  });
});
