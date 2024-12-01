'use strict';


/**
 * Retrieve a specific direction
 *
 * restaurantName String 
 * returns Directions
 **/
exports.directionsGET = function(restaurantName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "id" : "id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

