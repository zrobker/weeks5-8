const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate.js');

router.get('/', teamsController.getAll);

router.get('/:teamName', teamsController.getSingle);

router.post('/', validation.saveTeam, teamsController.createTeam);

router.put('/:teamName', validation.saveTeam, teamsController.updateTeam);

router.delete('/:teamName', teamsController.deleteTeam);

module.exports = router;
