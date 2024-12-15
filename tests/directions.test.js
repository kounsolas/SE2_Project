const test = require('ava');
const got = require('./init.test.js');

test('GET /directions should return direction details for a given restaurant name', async (t) => {
  const restaurantName = 'Mamalouka';
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName },
      responseType: 'json',
    });

    t.is(response.statusCode, 200);
    t.truthy(response.body.address, 'Expected address in response body');
    t.truthy(response.body.id, 'Expected id in response body');
  } catch (err) {
    console.error('Error Status:', err.response ? err.response.statusCode : 'Unknown');
    t.fail('Request failed with error: ' + JSON.stringify(err.response ? err.response.body : err));
  }
});


test('GET /directions should return error for non-existent restaurant name', async (t) => {
  const restaurantName = 'Test';
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const error = await t.throwsAsync(() =>
      t.context.got.get('directions', {
        searchParams: { restaurantName: encodedRestaurantName },
        responseType: 'json',
      })
    );

    t.is(error.response.statusCode, 404);
    t.deepEqual(error.response.body, { message: 'Directions not found' });
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});


// Define a test for empty restaurant name
test('GET /directions should return error if restaurantName is empty', async (t) => {
  try {
    const error = await t.throwsAsync(() =>
      t.context.got.get('directions', {
        searchParams: { restaurantName: '' }, // Empty restaurant name
        responseType: 'json',
      })
    );

    t.is(error.response.statusCode, 400); // Ελέγχουμε αν επιστρέφεται κωδικός 400 για κενό όνομα
    t.deepEqual(error.response.body.errors, [
      {
        message: "Empty value found for query parameter 'restaurantName'",
        path: '.query.restaurantName',
      },
    ]);
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});

// Define a test for non-existing restaurant
test('GET /directions should return error if restaurantName does not exist', async (t) => {
  const restaurantName = 'Nonexistent Restaurant'; // Όνομα που δεν υπάρχει
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const error = await t.throwsAsync(() =>
      t.context.got.get('directions', {
        searchParams: { restaurantName: encodedRestaurantName },
        responseType: 'json',
      })
    );

    t.is(error.response.statusCode, 404); // Ελέγχουμε αν επιστρέφεται κωδικός 404
    t.deepEqual(error.response.body, { message: "Directions not found" });
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});

// Define a test for valid restaurant names with various cases
test('GET /directions should return direction details for multiple restaurant names', async (t) => {
  const restaurantNames = ['Restaurant One', 'Restaurant Two'];
  const encodedRestaurantNames = restaurantNames.map(name => encodeURIComponent(name));

  try {
    const responses = await Promise.all(encodedRestaurantNames.map(restaurantName =>
      t.context.got.get('directions', {
        searchParams: { restaurantName },
        responseType: 'json',
      })
    ));

    responses.forEach((response, index) => {
      t.is(response.statusCode, 200); // Expected 200 status
      t.truthy(response.body.address, `Expected address for ${restaurantNames[index]}`);
      t.truthy(response.body.id, `Expected id for ${restaurantNames[index]}`);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});
