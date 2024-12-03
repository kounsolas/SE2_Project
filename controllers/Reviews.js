'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

module.exports.reviewsGET = function reviewsGET (req, res, next, restaurantName) {
  Reviews.reviewsGET(restaurantName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
