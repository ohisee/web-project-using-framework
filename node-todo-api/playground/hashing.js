const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var message = 'I am user number';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Has: ${hash}`);

var data = {
  id: 3
};
var token = {
  data: data,
  hash: SHA256(JSON.stringify(data) + 'salt_some_secret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'salt_some_secret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed');
}

var sdata = {
  id: 10
};

var tokennn = jwt.sign(sdata, 'salt_some_secret_123');
console.log(tokennn);

var decoded = jwt.verify(tokennn, 'salt_some_secret_123');
console.log('decoded', decoded);

var password = '123abc!';

bcrypt.genSalt(10, (error, salt) => {
  console.log(salt);
  bcrypt.hash(password, salt, (error, hash) => {
    console.log(hash);
  });
});

var hashedpassword = '$2a$10$WnmDbV6pZNpAMZuMbbWXguTQ65.z3acV7oI9mjkjZQRxEFYwYP/Xe';

bcrypt.compare(password, hashedpassword, (error, res) => {
  console.log(res);
});
