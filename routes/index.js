const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
router.use('/teams', require('./teams'));
router.use('/rosters', require('./rosters'));

module.exports = router;
