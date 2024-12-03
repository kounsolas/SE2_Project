const test = require('ava');  // Εισαγωγή του framework AVA για τα tests
const got = require('./init.test.js');   // Εισαγωγή του custom got instance που έχεις ορίσει

// Define a test to check the successful response for a valid restaurant name
test('GET /directions should return direction details for a given restaurant name', async (t) => {
  const restaurantName = 'Test Restaurant'; // Το όνομα του εστιατορίου που θέλουμε να ελέγξουμε
  const encodedRestaurantName = encodeURIComponent(restaurantName); // Κωδικοποιούμε την παράμετρο

  try {
    const response = await t.context.got.get('directions', {
      searchParams: { restaurantName: encodedRestaurantName }, // Χρησιμοποιούμε το κωδικοποιημένο όνομα
      responseType: 'json',
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Body:', response.body);

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

    console.log('Error:', error.response.body);
    t.is(error.response.statusCode, 400); // Ελέγχουμε αν επιστρέφεται κωδικός 400 για λάθος αίτηση
  } catch (err) {
    console.error('Unexpected error:', err);
    t.fail('Unexpected error: ' + (err.response ? err.response.body : err.message));
  }
});
