var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    //createdAt: (new Date()).getTime()
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    //createdAt: (new Date()).getTime()
    createdAt: moment().valueOf()
  };
};

module.exports = {
  generateMessage: generateMessage,
  generateLocationMessage: generateLocationMessage
};
