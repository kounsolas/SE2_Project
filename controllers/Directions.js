'use strict';

var utils = require('../utils/writer.js');
var Directions = require('../service/DirectionsService');

module.exports.directionsGET = function directionsGET (req, res, next, restaurantName) {
  Directions.directionsGET(restaurantName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

