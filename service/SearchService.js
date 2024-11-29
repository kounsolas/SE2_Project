'use strict';


/**
 * Retrieve a list of restaurants
 *
 * returns List
 **/
exports.searchGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "address" : "Leoforou Stratou 34",
  "restaurantName" : "Mamalouka"
}, {
  "address" : "Tsimiski 20",
  "restaurantName" : "Estrella"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

