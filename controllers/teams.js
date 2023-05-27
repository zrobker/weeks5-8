const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  // const getSingle = async (req, res) => {
  //   const teamName = new ObjectId(req.params.teamName);
  //   const result = await mongodb.getDb().db().collection('teams').find({ _id: teamName });
  //   result.toArray().then((lists) => {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.status(200).json(lists[0]);
  //   });
  // };
  
  // const createTeam = async (req, res) => {
  //   const team = {
  //     teamName: req.body.teamName,
  //     location: req.body.location,
  //     stadiumName: req.body.stadiumName,
  //     yearEstablished: req.body.yearEstablished,
  //     numberChampionships: req.body.numberChampionships
  //   };
  //   const response = await mongodb.getDb().db().collection('teams').insertOne(team);
  //   if (response.acknowledged) {
  //     res.status(201).json(response);
  //   } else {
  //     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  //   }
  // };
  
//   const updateTeam = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     // be aware of updateOne if you only want to update specific fields
//     const contact = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection('contacts')
//       .replaceOne({ _id: userId }, contact);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//     }
//   };
  
//   const deleteContact = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//     }
//   };
  
  module.exports = {
    getAll
    // getSingle,
    // createTeam
    // updateContact,
    // deleteContact
  };
  