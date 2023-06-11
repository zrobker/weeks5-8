const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/',requiresAuth(), require('./swagger'));
router.use('/teams',requiresAuth(), require('./teams'));
router.use('/rosters',requiresAuth(), require('./rosters'));

module.exports = router;
