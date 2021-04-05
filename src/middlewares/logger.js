const { createLogger, transports, format } = require('winston');

const winstonLogger = createLogger({
  transports: [
    new transports.Console({
      format: format.json(),
      prettyprint: true,
    }),
  ],
});

module.exports = (req, res, next) => {
  const myLog = {
    Date: Date.now(),
    Method: req.method,
    originalUrl: req.originalUrl,
    Body: req.body,
    Query: req.query,
    Headers: req.headers,
    dateValidation: req.dateValidation,
  };

  winstonLogger.info(myLog);

  next();
};
