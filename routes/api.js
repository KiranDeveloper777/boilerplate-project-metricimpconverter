'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){

      let input = req.query.input;

      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // IMPORTANT ORDER (FCC requires this exact order)

      if (initNum === "invalid number" && initUnit === "invalid unit") {
        return res.send("invalid number and unit");
      }

      if (initNum === "invalid number") {
        return res.send("invalid number");
      }

      if (initUnit === "invalid unit") {
        return res.send("invalid unit");
      }

      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });

    });

};
