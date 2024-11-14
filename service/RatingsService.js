'use strict';


/**
 * Retrieve a list of ratings
 *
 * restaurant_name String 
 * returns List
 **/
exports.ratingsGET = function(restaurant_name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "user_id" : "user32",
  "rating" : 4.5,
  "restaurant_name" : "mamalouka"
}, {
  "user_id" : "user32",
  "rating" : 4.5,
  "restaurant_name" : "mamalouka"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a rating
 *
 * id String 
 * no response value expected for this operation
 **/
exports.ratingsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific rating
 *
 * id String 
 * restaurant_name String 
 * returns Ratings
 **/
exports.ratingsIdGET = function(id,restaurant_name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : "user32",
  "rating" : 4.5,
  "restaurant_name" : "mamalouka"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a rating
 *
 * body Ratings Rating object that needs to be updated
 * restaurant_name String 
 * id String 
 * returns Ratings
 **/
exports.ratingsIdPUT = function(body,restaurant_name,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : "user32",
  "rating" : 4.5,
  "restaurant_name" : "mamalouka"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new ratings
 *
 * body Ratings Ratings object that needs to be added
 * restaurant_name String 
 * returns Ratings
 **/
exports.ratingsPOST = function(body,restaurant_name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : "user32",
  "rating" : 4.5,
  "restaurant_name" : "mamalouka"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

