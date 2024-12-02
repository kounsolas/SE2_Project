'use strict';

var utils = require('../utils/writer.js');
var Ratings = require('../service/RatingsService');

module.exports.ratingsGET = function ratingsGET(req, res, next, restaurant_name) {
  Ratings.ratingsGET(restaurant_name)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, { error: response.message }, response.statusCode || 500);
    });
};

module.exports.ratingsIdDELETE = function ratingsIdDELETE(req, res, next, id) {
  Ratings.ratingsIdDELETE(id)
    .then(function(response) {
      utils.writeJson(res, {}, 200);
    })
    .catch(function(response) {
      utils.writeJson(res, { error: response.message }, response.statusCode || 500);
    });
};

module.exports.ratingsIdGET = function ratingsIdGET(req, res, next, restaurant_name, id) {
  //console.log('Controller params:', { id, restaurant_name });
  Ratings.ratingsIdGET(id, restaurant_name)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, { error: response.message }, response.statusCode || 500);
    });
};

module.exports.ratingsIdPUT = function ratingsIdPUT(req, res, next, body, restaurant_name, id) {
  Ratings.ratingsIdPUT(body, restaurant_name, id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, { error: response.message }, response.statusCode || 500);
    });
};

module.exports.ratingsPOST = function ratingsPOST(req, res, next, body) {
  const restaurant_name = 'Mamalouka'; // Hardcoded value
  // console.log('Received Body in Controller:', body);

  Ratings.ratingsPOST(body, restaurant_name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (err) {
      console.error('Error in Controller:', err);
      utils.writeJson(res, { message: err.message }, err.statusCode || 500);
    });
};

