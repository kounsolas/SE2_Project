'use strict';

var utils = require('../utils/writer.js');
var Search = require('../service/SearchService');

module.exports.searchGET = function searchGET (req, res, next) {
  Search.searchGET()
    .then(function (response) {
      // console.log('Controller: Sending Respose:', response);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error('Controller: Error occurred:', error);
      utils.writeJson(res, response);
    });
};
