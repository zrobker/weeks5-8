const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { auth } = require('express-openid-connect');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('rosters').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    
    });
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving rosters.'
    });
  }
  };

  const getSingle = async (req, res) => {
    try {
      const teamId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db().collection('rosters').find({ _id: teamId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the desired roster.'
      });
    }
  };
  
  const createRoster = async (req, res) => {
    try {
      const Roster = {
        headCoach: req.body.headCoach,
          qb1: req.body.qb1,
          wr1: req.body.wr1,
          wr2: req.body.wr2,
          wr3: req.body.wr3,
          rb1: req.body.rb1,
          rb2: req.body.rb2,
          te1: req.body.te1,
          te2: req.body.te2,
          lb: req.body.lb,
          cb1: req.body.cb1,
          cb2: req.body.cb2,
          fs: req.body.fs
      };
      const response = await mongodb.getDb().db().collection('rosters').insertOne(Roster);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the roster.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to create a roster.'
      });
    }

  };
  
  const updateRoster = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      // be aware of updateOne if you only want to update specific fields
      const roster = {
          headCoach: req.body.headCoach,
          qb1: req.body.qb1,
          wr1: req.body.wr1,
          wr2: req.body.wr2,
          wr3: req.body.wr3,
          rb1: req.body.rb1,
          rb2: req.body.rb2,
          te1: req.body.te1,
          te2: req.body.te2,
          lb: req.body.lb,
          cb1: req.body.cb1,
          cb2: req.body.cb2,
          fs: req.body.fs
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('rosters')
        .replaceOne({ _id: userId }, roster);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the roster.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to update a roster.'
      });
    }
  };
  
  const deleteRoster = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('rosters').remove({ _id: userId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the roster.');
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while trying to delete a roster.'
      });
    }

  };
  
  module.exports = {
    getAll,
    getSingle,
    createRoster,
    updateRoster,
    deleteRoster
  };
  