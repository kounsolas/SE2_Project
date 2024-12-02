const test = require('ava'); // Import the ava framework for running tests
const got = require('./init.test.js'); // Import the custom got instance defined in "init.test.js"

// SUCCESS CASE: The request should return a 200 status code and a list of reviews
test('GET /reviews successful with restaurantName', async (t) => {
  try {
    // Simulate a GET request with a valid restaurantName
    const response = await t.context.got.get('reviews', {
      searchParams: { restaurantName: 'mamalouka' }, // Use the expected restaurant name
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    // Assert response status is 200
    t.is(response.statusCode, 200);

    // Assert response body is an array
    t.true(Array.isArray(response.body), 'Response should be an array of reviews');

    // Validate the structure of each review in the response
    response.body.forEach((review) => {
      t.truthy(review.id, 'Each review should have an id');
      t.truthy(review.user_id, 'Each review should have a user_id');
      t.truthy(review.restaurant_id, 'Each review should have a restaurant_id');
      t.true(typeof review.rating === 'number', 'Each review should have a numeric rating');
      t.truthy(review.comment, 'Each review should have a comment');
    });
  } catch (err) {
    console.error('Error:', err.response?.body || err.message);
    t.fail('Request failed with error: ' + err.message);
  }
});

// SUCCESS CASE: The request should return an empty array if restaurantName doesn't match
test('GET /reviews returns empty array for non-existent restaurantName', async (t) => {
  try {
    const response = await t.context.got.get('reviews', {
      searchParams: { restaurantName: 'invalid-restaurant' },
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    // Assert response status is 200
    t.is(response.statusCode, 200);

    // Assert response body is an empty array
    t.deepEqual(response.body, [], 'Response should be an empty array for an invalid restaurant name');
  } catch (err) {
    console.error('Error:', err.response?.body || err.message);
    t.fail('Request failed with error: ' + err.message);
  }
});

// FAILURE CASE: The request should fail if restaurantName is not provided (optional)
test('GET /reviews returns all reviews when restaurantName is not provided', async (t) => {
  try {
    const response = await t.context.got.get('reviews', {
      responseType: 'json'
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

    // Assert response status is 200
    t.is(response.statusCode, 200);

    // Assert response body is an array of reviews
    t.true(Array.isArray(response.body), 'Response should be an array of reviews');

    // Validate the structure of each review
    response.body.forEach((review) => {
      t.truthy(review.id, 'Each review should have an id');
      t.truthy(review.user_id, 'Each review should have a user_id');
      t.truthy(review.restaurant_id, 'Each review should have a restaurant_id');
      t.true(typeof review.rating === 'number', 'Each review should have a numeric rating');
      t.truthy(review.comment, 'Each review should have a comment');
    });
  } catch (err) {
    console.error('Error:', err.response?.body || err.message);
    t.fail('Request failed with error: ' + err.message);
  }
});
