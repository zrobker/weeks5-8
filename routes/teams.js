const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getAll);

router.get('/:teamName', teamsController.getSingle);

router.post('/:teamName', teamsController.createTeam);

// router.put('/:teamName', teamsController.updateTeam);

// router.delete('/:id', teamsController.deleteContact);

module.exports = router;
