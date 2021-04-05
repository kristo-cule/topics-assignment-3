const coinflip = require('coinflip');
const statuscodes = require('http-status-codes');

exports.chance = (req, res) => {
  if (coinflip()) {
    res.status(statuscodes.OK).json({ message: 'Hello World!' });
  } else {
    throw new Error('Oops');
  }
};
