const test = require('ava');  // Εισαγωγή του framework AVA για τα tests
const got = require('./init.test.js');   // Εισαγωγή του custom got instance που έχεις ορίσει

// Define a test to check the successful response for a valid restaurant name
test('GET /directions should return direction details for a given restaurant name', async (t) => {
  const restaurantName = 'Test Restaurant'; // Το όνομα του εστιατορίου που θέλουμε να ελέγξουμε
  const encodedRestaurantName = encodeURIComponent(restaurantName); // Κωδικοποιούμε την παράμετρο

  // console.log('Encoded Restaurant Name:', encodedRestaurantName); // Logging κωδικοποιημένο όνομα

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName }, // Χρησιμοποιούμε το κωδικοποιημένο όνομα
      responseType: 'json',
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body:', response.body);

    t.is(response.statusCode, 200); // Ελέγχουμε αν ο κωδικός κατάστασης είναι 200
    t.deepEqual(response.body, {
      address: "address",
      id: "id",
    }); // Ελέγχουμε αν η απόκριση ταιριάζει με το παραπάνω παράδειγμα
  } catch (err) {
    console.error('Error Status:', err.response ? err.response.statusCode : 'Unknown');
    console.error('Error Body:', err.response ? err.response.body : 'No response body');
    console.error('Error Message:', err.message);
    t.fail('Request failed with error: ' + JSON.stringify(err.response ? err.response.body : err));
  }
});

// Define a test to check the response when required parameters are missing
test('GET /directions should return error if restaurantName is missing', async (t) => {
  try {
    const error = await t.throwsAsync(() =>
      t.context.got.get('directions', {
        responseType: 'json',
      })
    );

    // console.log('Error:', error.response.body);
    t.is(error.response.statusCode, 400); // Ελέγχουμε αν επιστρέφεται κωδικός 400 για λάθος αίτηση
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

    // console.log('Error:', error.response.body);
    t.is(error.response.statusCode, 400); // Ελέγχουμε αν επιστρέφεται κωδικός 400 για κενό όνομα
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});


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
      // console.log(`Response for ${restaurantNames[index]}:`, response.body);
      t.is(response.statusCode, 200); // Expected 200 status
      t.deepEqual(response.body, {
        address: "address",
        id: "id",
      }); // Expected response structure
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});


test('GET /directions should return direction details for a long restaurant name', async (t) => {
  const restaurantName = 'A very long restaurant name that exceeds usual length'; // Long restaurant name
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName },
      responseType: 'json',
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body:', response.body);
    t.is(response.statusCode, 200); // Expected 200 for valid name
    t.deepEqual(response.body, {
      address: "address",
      id: "id",
    }); // Expected response structure
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});



test('GET /directions should handle restaurantName with spaces correctly', async (t) => {
  const restaurantName = 'Restaurant with spaces';
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName },
      responseType: 'json',
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body:', response.body);
    t.is(response.statusCode, 200); // Expected 200 status code
    t.deepEqual(response.body, {
      address: "address",
      id: "id",
    }); // Expected response structure
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});


test('GET /directions should return direction details for a restaurant name with mixed case', async (t) => {
  const restaurantName = 'Test Restaurant'; // Mixed case name
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName },
      responseType: 'json',
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body:', response.body);
    t.is(response.statusCode, 200); // Expected 200 status code
    t.deepEqual(response.body, {
      address: "address",
      id: "id",
    }); // Expected response structure
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});

test('GET /directions should return a response with the correct body structure', async (t) => {
  const restaurantName = 'Test Restaurant';
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName },
      responseType: 'json',
    });

    // console.log('Response Status:', response.statusCode);
    // console.log('Response Body:', response.body);

    // Check the structure of the response body
    t.is(response.statusCode, 200);
    t.truthy(response.body.address, 'Expected "address" field in response body');
    t.truthy(response.body.id, 'Expected "id" field in response body');
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});


test('GET /directions should return error if the request times out', async (t) => {
  const restaurantName = 'Test Restaurant';
  const encodedRestaurantName = encodeURIComponent(restaurantName);

  try {
    const error = await t.throwsAsync(() =>
      t.context.got.get('directions', {
        searchParams: { restaurantName: encodedRestaurantName },
        timeout: 1, // Very short timeout to simulate a timeout error
        responseType: 'json',
      })
    );

    // Log error properties for debugging
    // console.log('Error Code:', error.code);
    // console.log('Error Message:', error.message);

    // Ensure that the error is indeed a timeout
    t.is(error.code, 'ETIMEDOUT', 'Expected timeout error code');
  } catch (err) {
    console.error('Unexpected error:', err.message);
    t.fail('Unexpected error: ' + err.message);
  }
});


