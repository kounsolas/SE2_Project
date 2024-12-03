'use strict';


/**
 * Retrieve a list of reviews
 *
 * restaurantName String The name of the restaurant to filter reviews (optional)
 * returns List
 **/
exports.reviewsGET = function(restaurantName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "user_id" : "user_id",
  "restaurant_id" : "restaurant_id",
  "rating" : 0.8008281904610115,
  "comment" : "comment",
  "id" : "id"
}, {
  "user_id" : "user_id",
  "restaurant_id" : "restaurant_id",
  "rating" : 0.8008281904610115,
  "comment" : "comment",
  "id" : "id"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

