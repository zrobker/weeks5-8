const validator = require('../helpers/validate');

const saveTeam = (req, res, next) => {
  const validationRule = {
    teamName: 'required|string',
    location: 'required|string',
    stadiumName: 'required|string',
    yearEstablished: 'required|string',
    numberChampionships: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'A team valitdation error occured.',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRoster = (req, res, next) => {
    const validationRule = {
        headCoach: 'required|string',
        qb1: 'required|string',
        wr1: 'required|string',
        wr2: 'required|string',
        wr3: 'required|string',
        rb1: 'required|string',
        rb2: 'required|string',
        te1: 'required|string',
        te2: 'required|string',
        lb: 'required|string',
        cb1: 'required|string',
        cb2: 'required|string',
        fs: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'A roster valitdation error occured.',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveTeam,
  saveRoster
};