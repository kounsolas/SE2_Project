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

module.exports.getReservation = function getReservation (req, res, next, id) {
  Reservations.getReservation(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listReservations = function listReservations (req, res, next) {
  Reservations.listReservations()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.makeReservation = function makeReservation (req, res, next, body, restaurantName) {
  Reservations.makeReservation(body, restaurantName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
