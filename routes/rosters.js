const express = require('express');
const router = express.Router();

const rostersController = require('../controllers/rosters');

router.get('/', rostersController.getAll);

router.get('/:id', rostersController.getSingle);

router.post('/', rostersController.createRoster);

router.put('/:id', rostersController.updateRoster);

router.delete('/:id', rostersController.deleteRoster);

module.exports = router;
