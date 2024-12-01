'use strict';

var utils = require('../utils/writer.js');
var Payment = require('../service/PaymentService');

module.exports.payBookingFee = function payBookingFee (req, res, next, body) {
  //console.log('Received body: ', body);
  const { cardHolderName, cardNumber, CVC, expirationDate } = body;
  if (!cardHolderName || !cardNumber || !CVC || !expirationDate) {
    const error = { message: 'Missing required field: ' };
    
    if (!cardHolderName) error.message += 'cardHolderName ';
    if (!cardNumber) error.message += 'cardNumber ';
    if (!CVC) error.message += 'CVC ';
    if (!expirationDate) error.message += 'expirationDate ';
    
    console.log(error);
    return utils.writeJson(res, error, 400);  // Return error with 400 status code
  }
  Payment.payBookingFee(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
