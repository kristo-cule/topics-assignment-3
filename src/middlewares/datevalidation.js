const statuscodes = require('http-status-codes');

module.exports = (req, res, next) => {
  const DVHeader = req.headers['date-validation'];
  const DVQuery = req.query['date-validation'];

  const MyEpoch = Math.round(Date.now() / 1000);
  const UpperEpoch = MyEpoch + 300;
  const LowerEpoch = MyEpoch - 300;
  let TempEpoch = 0;

  if (DVHeader === undefined && DVQuery === undefined) {
    res.status(statuscodes.UNAUTHORIZED).json({ message: 'No Epoch supplied.' });
  } else if (DVHeader === undefined) {
    TempEpoch = parseInt(DVQuery, 10);
    if ((TempEpoch >= LowerEpoch) && (TempEpoch <= UpperEpoch)) {
      req.dateValidation = TempEpoch;
      next();
    } else {
      res.status(statuscodes.UNAUTHORIZED).json({ message: 'The Query Epoch specified is out-of-spec!' });
    }
  } else if (DVQuery === undefined) {
    TempEpoch = parseInt(DVHeader, 10);
    if ((TempEpoch >= LowerEpoch) && (TempEpoch + 300 <= UpperEpoch)) {
      req.dateValidation = TempEpoch;
      next();
    } else {
      res.status(statuscodes.UNAUTHORIZED).json({ message: 'The Header Epoch specified is out-of-spec!' });
    }
  } else {
    const TempHeader = parseInt(DVHeader, 10);
    const TempQuery = parseInt(DVQuery, 10);

    if (TempHeader !== TempQuery) {
      res.status(statuscodes.UNAUTHORIZED).json({ message: 'Please use the same epoch time in both Header and Query.' });
    } else if ((TempHeader >= LowerEpoch) && (TempHeader <= UpperEpoch)) {
      if ((TempQuery >= LowerEpoch) && (TempQuery <= UpperEpoch)) {
        req.dateValidation = TempQuery;
        next();
      } else {
        res.status(statuscodes.UNAUTHORIZED).json({ message: 'The Query Epoch specified is out-of-spec!' });
      }
    } else {
      res.status(statuscodes.UNAUTHORIZED).json({ message: 'The Header Epoch specified is out-of-spec!' });
    }
  }
};
