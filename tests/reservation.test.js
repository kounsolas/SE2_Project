const test = require('ava'); // Εισάγουμε το AVA για την εκτέλεση των tests
const { got } = require('./init.test'); // Εισάγουμε το got από το init.test.js

// GET /reservations - Ελέγχει αν επιστρέφεται λίστα κρατήσεων
test.serial('GET /reservations returns a list of reservations', async (t) => {
    const client = got(t); // Ανάκτηση του σωστού instance του got από το context
    try {
        const { body, statusCode } = await client('reservations'); // Κάνουμε GET αίτημα στο /reservations
        console.log('GET /reservations Response:', body);

        t.is(statusCode, 200); // Ελέγχουμε αν η απόκριση είναι 200
        t.true(Array.isArray(body)); // Ελέγχουμε αν το σώμα της απόκρισης είναι πίνακας

        body.forEach((reservation) => {
            t.truthy(reservation.restaurantName); // Ελέγχουμε αν υπάρχει το πεδίο restaurantName
            t.truthy(reservation.date); // Ελέγχουμε αν υπάρχει το πεδίο date
        });
    } catch (err) {
        console.error('Error in GET /reservations:', err.response ? err.response.body : err);
        throw err;
    }
});

test('POST /reservations creates a new reservation', async (t) => {
    const client = t.context.got;
    const newReservation = {
        date: '2000-01-23T04:56:07.000Z',
        allergies: 'None',
        time: '2024-12-01T20:00:00Z', // Ορθή μορφή ISO 8601 για ώρα
    };

    const restaurantName = 'Mamalouka'; // Το όνομα του εστιατορίου για το query string

    try {
        const response = await client.post('reservations', {
            searchParams: { RestaurantName: restaurantName }, // Χρήση searchParams για query string
            json: newReservation,
            responseType: 'json',
        });

        const { body, statusCode } = response;
        console.log('POST /reservations Response Body:', body);
        console.log('POST /reservations Status Code:', statusCode);

        t.is(statusCode, 200, `Expected status 201 but got ${statusCode}`);
        t.truthy(body.id, 'ID should be returned');
        t.deepEqual(body.restaurantName, restaurantName, 'Restaurant name does not match');
    } catch (err) {
        console.error('Error in POST /reservations:', err);

        if (err.response) {
            console.error('Response Status Code:', err.response.statusCode);
            console.error('Response Body:', JSON.stringify(err.response.body, null, 2));
            console.error('Response Headers:', err.response.headers);
        } else {
            console.error('Unexpected Error:', err.message || err);
        }

        t.fail(
            `POST request failed: ${
                err.response ? JSON.stringify(err.response.body, null, 2) : err.message || err
            }`
        );
    }
});






// GET /reservations/{id} - Επιστρέφει συγκεκριμένη κράτηση
test('GET /reservations/{id} returns a specific reservation', async (t) => {
    const client = got(t);
    const reservationId = '105'; // Δοκιμαστικό ID, βεβαιώσου ότι υπάρχει στο API
    try {
        const { body, statusCode } = await client(`reservations/${reservationId}`);
        console.log('GET /reservations/{id} Response:', body);

        t.is(statusCode, 200); // Ελέγχουμε αν η απόκριση είναι 200
        t.truthy(body.restaurantName); 
        t.deepEqual(body.id, reservationId);
    } catch (err) {
        console.error('Error in GET /reservations/{id}:', err.response ? err.response.body : err);
        throw err;
    }
});

// PUT /reservations/{id} - Ενημερώνει κράτηση
test('PUT /reservations/{id} updates a reservation', async (t) => {
    const client = t.context.got;
    const reservationId = '105'; // Δοκιμαστικό ID
    const updatedReservation = {
        date: '2000-01-23T04:56:07.000Z',
        allergies: 'Peanuts',
        restaurantName: 'Mamalouka',  // Η τιμή που είχε και η παλιά κράτηση
        time: '2024-12-01T20:00:00Z',
    };

    try {
        const { body, statusCode } = await client.put(`reservations/${reservationId}`, {
            json: updatedReservation,
            responseType: 'json',
        });

        console.log('PUT /reservations/{id} Response:', body);

        t.is(statusCode, 200, `Expected status 200 but got ${statusCode}`);
        t.deepEqual(new Date(body.date).toISOString(), updatedReservation.date, 'Date does not match');
        t.deepEqual(body.restaurantName, updatedReservation.restaurantName, 'Restaurant name does not match');
    } catch (err) {
        console.error('Error in PUT /reservations/{id}:', err.response?.body || err);
        t.fail('PUT request failed');
    }
});


// DELETE /reservations/{id} - Διαγράφει κράτηση
test('DELETE /reservations/{id} cancels a reservation', async (t) => {
    const client = got(t);
    const reservationId = '105'; // Δοκιμαστικό ID, βεβαιώσου ότι υπάρχει στο API
    try {
        const { statusCode } = await client.delete(`reservations/${reservationId}`);
        console.log(`DELETE /reservations/{id} StatusCode: ${statusCode}`);

        t.is(statusCode, 200); // Καμία περιγραφή, μόνο επιτυχία
    } catch (err) {
        console.error('Error in DELETE /reservations/{id}:', err.response ? err.response.body : err);
        throw err;
    }
});


// POST /reservations - Αποτυχία δημιουργίας κράτησης λόγω μη έγκυρων δεδομένων
test('POST /reservations fails with invalid data', async (t) => {
    const client = t.context.got;
    const invalidReservation = {
        date: 'invalid-date',
        allergies: 123,
    };

    const restaurantName = 'Mamalouka';

    try {
        await client.post('reservations', {
            searchParams: { RestaurantName: restaurantName },
            json: invalidReservation,
            responseType: 'json',
        });
        t.fail('POST should have failed with invalid data');
    } catch (err) {
        t.is(err.response?.statusCode, 400, 'Expected status 400 for invalid data');
        // Απλά έλεγχος για την ύπαρξη οποιουδήποτε σώματος στην απόκριση
        t.truthy(err.response?.body, 'Expected some response body');
    }
});





