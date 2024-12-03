'use strict';


/**
 * Pay the booking fee
 * Last stage of completing the reserevation
 *
 * body Payment Pay the booking fee of the reservation (optional)
 * returns Boolean
 **/
exports.payBookingFee = function(body) {
  return new Promise(function(resolve, reject) {
    const requiredFields = ['cardHolderName', 'cardNumber', 'CVC', 'expirationDate'];

    for (const field of requiredFields){
      if(!body.hasOwnProperty(field)){
        //console.log('WHATTT!!!!!');
        return // examples['application/json'] = {error: true};//reject(new Error(`Missing required field: ${field}` ));
      }
    }
    var examples = {};
    examples['application/json'] = {success: true};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

