'use strict';

var utils = require('../utils/writer.js');
var Search = require('../service/SearchService');

module.exports.searchGET = function searchGET (req, res, next) {
  Search.searchGET(req)
    .then(function (response) {
      // console.log('Controller: Sending Respose:', response);
      // console.log(req);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Controller: Error occurred:', error);
      res.status(500).json({error: 'Server Error'});
    });
    next();
};
