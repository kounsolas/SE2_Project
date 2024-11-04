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

module.exports.preOrderIdGET = function preOrderIdGET (req, res, next, id, restaurant_name) {
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

module.exports.preOrderPOST = function preOrderPOST (req, res, next, body) {
  Preorder.preOrderPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
