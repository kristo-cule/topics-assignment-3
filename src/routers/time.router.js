const router = require('express').Router();
const ChanceController = require('../controllers/chance');

router.all('/', ChanceController.chance);

module.exports = router;
