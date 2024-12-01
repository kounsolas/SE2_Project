'use strict';

// In-memory storage for preorders (this will reset when the server restarts)
// Sample data to initialize preOrders
let preOrders = [
  { price: 7, name: "salat", id: "105", restaurant_name: "Mamalouka" },
  { price: 8, name: "pasta", id: "110", restaurant_name: "Pastabar" }
];

/**
 * Retrieve a list of menu items
 *
 * returns List
 **/
exports.preOrderGET = function() {
  return new Promise(function(resolve, reject) {
    // Check if there are any preorders
    if (preOrders.length > 0) {
      // Resolve with the current list of preorders
      resolve(preOrders);
    } else {
      // Resolve with an empty array if no preorders exist
      resolve([]);
    }
  });
};


/**
 * Delete a menu item
 *
 * id String 
 * no response value expected for this operation
 **/
exports.preOrderIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific menu item
 *
 * id String 
 * restaurant_name String 
 * returns PreOrder
 **/
exports.preOrderIdGET = function(id,restaurant_name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 7,
  "name" : "salat",
  "id" : "105",
  "restaurant_name" : "Mamalouka"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a menu item
 *
 * body PreOrder Menu item object that needs to be updated
 * restaurant_name String 
 * id String 
 * returns PreOrder
 **/
exports.preOrderIdPUT = function(body,restaurant_name,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 7,
  "name" : "salat",
  "id" : "105",
  "restaurant_name" : "Mamalouka"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new menu item
 *
 * body PreOrder Menu item object that needs to be added
 * returns PreOrder
 **/
exports.preOrderPOST = function(body) {
  return new Promise(function(resolve, reject) {
    // Check for missing required fields
    const missingFields = [];
    if (!body.price) missingFields.push('price');
    if (!body.name) missingFields.push('name');
    if (!body.id) missingFields.push('id');
    if (!body.restaurant_name) missingFields.push('restaurant_name');

    if (missingFields.length > 0) {
      // If any fields are missing, reject with an error
      const error = {
        statusCode: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
      reject(error);
      return;
    }

    // Assuming body contains the new preorder data
    const newPreOrder = {
      price: body.price,
      name: body.name,
      id: body.id,
      restaurant_name: body.restaurant_name
    };

    // Add the new preorder to the in-memory storage
    preOrders.push(newPreOrder);

    // Resolve with the newly created preorder object
    resolve(newPreOrder);
  });
};


