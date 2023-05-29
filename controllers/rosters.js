const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('rosters').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const getSingle = async (req, res) => {
    const RosterName = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('rosters').find({ _id: RosterName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  const createRoster = async (req, res) => {
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
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };
  
  const updateRoster = async (req, res) => {
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
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };
  
  const deleteRoster = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('rosters').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };
  
  module.exports = {
    getAll,
    getSingle,
    createRoster,
    updateRoster,
    deleteRoster
  };
  