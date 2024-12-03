'use strict';

var utils = require('../utils/writer.js');
var Preorder = require('../service/PreorderService');

module.exports.preOrderGET = function preOrderGET (req, res, next) {
  Preorder.preOrderGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.preOrderIdDELETE = function preOrderIdDELETE (req, res, next, id) {
  Preorder.preOrderIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.preOrderIdGET = function preOrderIdGET (req, res, next, restaurant_name, id) {
  
  Preorder.preOrderIdGET(id, restaurant_name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.preOrderIdPUT = function preOrderIdPUT (req, res, next, body, restaurant_name, id) {
  Preorder.preOrderIdPUT(body, restaurant_name, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.preOrderPOST = function preOrderPOST(req, res, next, body = {}) {
  const { price, name, id, restaurant_name } = body;

  // Validate required fields
  const missingFields = [];
  if (price == null) missingFields.push('price'); // Explicitly check for null/undefined
  if (name == null) missingFields.push('name');
  if (id == null) missingFields.push('id');
  if (restaurant_name == null) missingFields.push('restaurant_name');

  if (missingFields.length > 0) {
    const error = { message: `Missing required field(s): ${missingFields.join(' ')}` };
    console.error('Error in preOrderPOST:', error);
    return utils.writeJson(res, error, 400); // Return 400 for bad requests
  }

  Preorder.preOrderPOST(body)
    .then((response) => utils.writeJson(res, response))
    .catch((error) => {
      console.error('Error in preOrderPOST:', error);
      console.error('Error details:', error.message); // Log error details
      utils.writeJson(res, error, error.statusCode || 500);
    });
};