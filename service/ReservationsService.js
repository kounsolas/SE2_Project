'use strict';


/**
 * Cancel a reservation
 * Cancel an existing reservation
 *
 * id String 
 * no response value expected for this operation
 **/
exports.cancelReservation = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific reservation
 * Retrieve details of a specific reservation
 *
 * id String 
 * returns Reservation
 **/
exports.getReservation = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "allergies" : "Mushrooms",
  "restaurantName" : "Mamalouka",
  "id" : "105",
  "time" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a list of reservations
 * Retrieve a list of all reservations
 *
 * returns List
 **/
exports.listReservations = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "allergies" : "Mushrooms",
  "restaurantName" : "Mamalouka",
  "id" : "105",
  "time" : "2000-01-23T04:56:07.000+00:00"
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "allergies" : "Mushrooms",
  "restaurantName" : "Mamalouka",
  "id" : "105",
  "time" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Make a reservation
 * Make a new reservation
 *
 * body Reservation 
 * restaurantName String 
 * returns Reservation
 **/
exports.makeReservation = function(body,restaurantName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "allergies" : "Mushrooms",
  "restaurantName" : "Mamalouka",
  "id" : "105",
  "time" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a reservation
 * Update an existing reservation
 *
 * body Reservation Reservation object that needs to be updated
 * id String 
 * returns Reservation
 **/
exports.updateReservation = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "allergies" : "Mushrooms",
  "restaurantName" : "Mamalouka",
  "id" : "105",
  "time" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

