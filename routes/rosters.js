const express = require('express');
const router = express.Router();

const rostersController = require('../controllers/rosters');
const validation = require('../middleware/validate.js');
const requiresAuth = require('express-openid-connect');

router.get('/', rostersController.getAll);

router.get('/:id', rostersController.getSingle);

router.post('/', validation.saveRoster, rostersController.createRoster);

router.put('/:id', validation.saveRoster, rostersController.updateRoster);

router.delete('/:id', requiresAuth, rostersController.deleteRoster);

module.exports = router;
