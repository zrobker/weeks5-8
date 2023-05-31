const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving teams.'
    });
  }
};

  const getSingle = async (req, res) => {
    try {
      const teamName = req.params.teamName;
      const result = await mongodb.getDb().db().collection('teams').find({ teamName: teamName });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the desired team.'
      });
    }
  };
  
  const createTeam = async (req, res) => {
    try {
      const team = {
        teamName: req.body.teamName,
        location: req.body.location,
        stadiumName: req.body.stadiumName,
        yearEstablished: req.body.yearEstablished,
        numberChampionships: req.body.numberChampionships
      };
      const response = await mongodb.getDb().db().collection('teams').insertOne(team);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the team.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to create a team.'
      });
    }
    
  };
  
  const updateTeam = async (req, res) => {
    try {
      const teamName = req.params.teamName;
      // be aware of updateOne if you only want to update specific fields
      const team = {
        teamName: req.body.teamName,
        location: req.body.location,
        stadiumName: req.body.stadiumName,
        yearEstablished: req.body.yearEstablished,
        numberChampionships: req.body.numberChampionships
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('teams')
        .replaceOne({ teamName: teamName }, team);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the team.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to update a team.'
      });
    }
    
  };
  
  const deleteTeam = async (req, res) => {
    try {
      const teamName = req.params.teamName;
      const response = await mongodb.getDb().db().collection('teams').remove({ teamName: teamName }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the team.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to delete a team.'
      });
    }

  };
  0
  module.exports = {
    getAll,
    getSingle,
    createTeam,
    updateTeam,
    deleteTeam
  };
  