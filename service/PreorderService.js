'use strict';


/**
 * Retrieve a list of menu items
 *
 * returns List
 **/
exports.preOrderGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ 
  {
  "price" : 7,
  "name" : "salat",
  "id" : "105",
  "restaurant_name" : "Mamalouka"
  }, 
  {
  "price" : 8,
  "name" : "pasta",
  "id" : "110",
  "restaurant_name" : "Pastabar"
  } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
    // Here you would typically insert the new preorder into a database.
    // For demonstration purposes, we'll simply return the body as is.

    // Assuming body contains the new preorder data
    const newPreOrder = {
      price: body.price,
      name: body.name,
      id: body.id,
      restaurant_name: body.restaurant_name
    };

    // You can also add logic here to store the new preorder in memory or a database

    // Resolve with the newly created preorder object
    resolve(newPreOrder);
  });
}
