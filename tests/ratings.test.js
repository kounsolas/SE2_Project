// Description: Test cases for the ratings API endpoints
const test = require('ava');  //import the ava framework used for running tests
const got = require('./init.test.js');   //import the custom got instance defined in "init.tests.js"

// Test case for POST /ratings to create a new rating
test('POST /ratings successful', async (t) => {
  const requestBody = {
    "user_id": "user32",
    "rating": 4.5,
    "restaurant_name": "Mamalouka"
  };
  const restaurantName = 'Mamalouka';
  try {
    const response = await t.context.got.post(`ratings?restaurant_name=${restaurantName}`, {
      json: requestBody,
      responseType: 'json'
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body :', response.body);   

    t.is(response.statusCode, 200); // Check if the status code is 200
    t.deepEqual(response.body, requestBody);  // Assert the response body matches the request data
    // console.log('RESPONSE: ', response.body);
  } catch (err) {
    console.error('Full Error Object:', err);
    console.error('Error Response:', err.response ? err.response.body : 'No response body');
    t.fail(`Request failed with error: ${err.message}`);
  }
});

// Test case for GET /ratings with a restaurant name
test('GET /ratings successful', async (t) => {
  const restaurantName = "mamalouka";

  try {
    const response = await t.context.got.get(`ratings?restaurant_name=${restaurantName}`, {
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    t.is(response.statusCode, 200); // Check if the status code is 200
    t.true(Array.isArray(response.body));  // Assert the response body is an array
    t.is(response.body[0].restaurant_name, restaurantName);  // Check if the restaurant name matches
  } catch (err) {
    console.error('Error: ', err.response.body);
    t.fail('Request failed with error: ' + err.message);
  }
});

// Test case for GET /ratings/{id} to retrieve a specific rating
test('GET /ratings/{id} successful', async (t) => {
  const ratingId = "user32"; // Valid rating ID
  const restaurantName = "Mamalouka"; // Valid restaurant name

  try {
    const response = await t.context.got.get(`ratings/${ratingId}`, {
      searchParams: { restaurant_name: restaurantName },
      responseType: 'json',
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    t.is(response.statusCode, 200); // Expect status 200
    t.deepEqual(response.body, {
      "user_id": "user32",
      "rating": 4.5,
      "restaurant_name": "Mamalouka",
    }); // Expect exact body match
  } catch (err) {
    console.error('Error: ', err.response?.body);
    t.fail(`Request failed with error: ${err.message}`);
  }
});



// Test case for PUT /ratings/{id} to update a rating
test('PUT /ratings/{id} successful', async (t) => {
  const ratingId = "user32"; // Valid rating ID
  const restaurantName = "mamalouka";
  const requestBody = {
    "user_id": "user32",
    "rating": 5.0,
    "restaurant_name": "mamalouka"
  };

  try {
    const response = await t.context.got.put(`ratings/${ratingId}?restaurant_name=${restaurantName}`, {
      json: requestBody,
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    t.is(response.statusCode, 200); // Check if the status code is 200
    t.deepEqual(response.body, requestBody);  // Assert the response body matches the updated data
  } catch (err) {
    console.error('Error: ', err.response.body);
    t.fail('Request failed with error: ', + err.message);
  }
});

// Test case for DELETE /ratings/{id} to delete a rating
test('DELETE /ratings/{id} successful', async (t) => {
  const ratingId = "user32"; // Valid rating ID

  try {
    const response = await t.context.got.delete(`ratings/${ratingId}`, {
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    t.is(response.statusCode, 200); // Check if the status code is 200
  } catch (err) {
    console.error('Error: ', err.response.body);
    t.fail('Request failed with error: ', + err.message);
  }
});

// Test case for POST /ratings fails when required fields are missing
test('POST /ratings fails when required fields are missing', async (t) => {
  const requestBody = {
    "user_id": "user32",
    "rating": 4.5
    // Missing restaurant_name
  };

  const error = await t.throwsAsync(() => t.context.got.post('ratings', {
    json: requestBody,
    responseType: 'json'
  }));

  t.is(error.message, 'Response code 400 (Bad Request)');
});

// Test case for GET /ratings fails when restaurant_name is missing
test('GET /ratings fails when restaurant_name is missing', async (t) => {
  const error = await t.throwsAsync(() => t.context.got.get('ratings', {
    responseType: 'json'
  }));

  t.is(error.message, 'Response code 400 (Bad Request)');
});

// Test case for GET /ratings/{id} fails when rating not found
test('GET /ratings/{id} fails when rating not found', async (t) => {
  const ratingId = "nonexistentId"; // Invalid rating ID
  const restaurantName = "mamalouka";

  const error = await t.throwsAsync(() => t.context.got(`ratings/${ratingId}?restaurant_name=${restaurantName}`));

  t.is(error.message, 'Response code 404 (Not Found)');
});

// More tests can be added here to cover other scenarios

