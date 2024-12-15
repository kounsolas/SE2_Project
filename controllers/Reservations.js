'use strict';

var utils = require('../utils/writer.js');
var Reservations = require('../service/ReservationsService');

module.exports.cancelReservation = function cancelReservation (req, res, next, id) {
  Reservations.cancelReservation(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};




module.exports.listReservations = function listReservations(req, res, next) {
  const restaurantName = req.query.restaurantName; // Ανάκτηση του restaurantName από τα query parameters
  Reservations.listReservations(restaurantName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || 'Internal server error' }, 500);
    });
};


module.exports.makeReservation = function makeReservation(req, res, next, body, restaurantName) {
  // Ensure the restaurant name exists in the query
  if (!restaurantName) {
      utils.writeJson(res, { message: 'Restaurant name is required' }, 400);
      return;
  }

  Reservations.makeReservation(body, restaurantName)
      .then(function (response) {
          utils.writeJson(res, response, 201);
      })
      .catch(function (error) {
          utils.writeJson(res, { message: error.message || 'Internal server error' }, error.statusCode || 500);
      });
};

module.exports.getReservation = function getReservation(req, res, next, id, restaurantName) {
  Reservations.getReservation(id, restaurantName)
      .then(function (response) {
          utils.writeJson(res, response);
      })
      .catch(function (error) {
          utils.writeJson(res, { message: error.message || 'Internal server error' }, error.statusCode || 500);
      });
};



module.exports.updateReservation = function updateReservation (req, res, next, body, id) {
  Reservations.updateReservation(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
