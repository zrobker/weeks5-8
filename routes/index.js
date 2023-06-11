const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
router.use('/teams', require('./teams'));
router.use('/rosters', require('./rosters'));
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
