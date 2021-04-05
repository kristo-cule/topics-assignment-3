const statuscodes = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  res.status(statuscodes.INTERNAL_SERVER_ERROR).send(`We're sorry, the error was: ${err.message}`);
};
