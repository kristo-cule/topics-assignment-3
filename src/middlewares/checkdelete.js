const statuscodes = require('http-status-codes');

module.exports = (req, res, next) => {
  if (req.method === 'DELETE') {
    res.status(statuscodes.METHOD_NOT_ALLOWED).json({ message: 'Delete cannot be used.' });
  } else {
    next();
  }
};
