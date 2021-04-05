const express = require('express');
const bodyParser = require('body-parser');

const checkdelete = require('./middlewares/checkdelete');
const datevalidation = require('./middlewares/datevalidation');
const logger = require('./middlewares/logger');
const catcherror = require('./middlewares/catcherror');

const app = express();
const port = 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(checkdelete);
app.use(datevalidation);
app.use(logger);
app.use(catcherror);

app.listen(port);
