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

  // New validation for overly long cardHolderName
  if (cardHolderName.length > 255) {
      return utils.writeJson(res, { message: 'Cardholder name is too long' }, 400);
  }

  if(!isValidCardHolderName(body.cardHolderName)){
    return utils.writeJson(res, {message: 'Invalid Card Holder Name'}, 400);
  }

  if(!isValidCardNumber(body.cardNumber)){
    return utils.writeJson(res, {message: 'Invalid Card number'}, 400);
  }

  if(!isValidCVC(body.CVC)){
    return utils.writeJson(res, {message:'Invalid CVC'}, 400);
  }

  if(!isValidDate(body.expirationDate)){
    return utils.writeJson(res, {message: 'Invalid Date'}, 400);
  }

  Payment.payBookingFee(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.wrongMethod = function wrongMethod(req, res) {
  res.status(405).json({message: "Method not allowed"});
}

function isValidCardHolderName(cardHolderName){
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(cardHolderName);
}

function isValidCardNumber(cardNumber) {
  const regex = /^\d{16}$/;
  return regex.test(cardNumber);
}

function isValidCVC(CVC){
  return Number.isInteger(CVC) && CVC >= 100 && CVC <= 999;
}

function isValidDate(expirationDate){
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(expirationDate);
}