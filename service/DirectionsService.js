'use strict';

/**
 * Retrieve a specific direction
 *
 * restaurantName String
 * returns Directions
 **/
exports.directionsGET = function (restaurantName) {
  return new Promise(function (resolve, reject) {
    const examples = {
      Mamalouka: {
        address: 'Leoforou Stratou 34',
        id: '1',
      },
    };

    // Check if the restaurant name exists in the examples
    if (examples[restaurantName]) {
      resolve(examples[restaurantName]);
    } else {
      // If not found, resolve with null to trigger the 404 response
      resolve(null);
    }
  });
};