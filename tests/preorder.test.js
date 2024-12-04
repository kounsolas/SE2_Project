const test = require('ava');  // import the ava framework used for running tests
const got = require('./init.test.js');   // import the custom got instance defined in "init.tests.js"

// Testing if the GET structure of the response is correct
test.serial('Get /preorder returns correct structure', async(t) => {
    try{
        const {body, statusCode} = await t.context.got('preorder');
        t.is(statusCode, 200); // Checking if we received the correct status code
        body.forEach((item) => {
            t.truthy(item.price); // Ensures each result has a price field
            t.truthy(item.name); // Ensures each result has a name field
            t.truthy(item.id);  // Ensures each result has an id field
            t.truthy(item.restaurant_name); // Ensures each result has a restaurant_name field
        });
    } catch(err){
        console.log('Error: ', err);
        throw err;
    }
});

// Testing if the GET preorder returns correct response and status code
test.serial("Get /preorder returns correct response and status code", async (t) => {
    try {
        const { body, statusCode } = await t.context.got("preorder");
        t.is(statusCode, 200); // Check the status code

        // Validate the structure of the response
        t.true(Array.isArray(body)); // Ensure body is an array
        t.is(body.length, 2); // Ensure there are two items

        // Check if each item has the correct fields
        body.forEach(item => {
            t.truthy(item.price);
            t.truthy(item.name);
            t.truthy(item.id);
            t.truthy(item.restaurant_name);
        });
    } catch (err) {
        console.log('Error : ', err);
        throw err;
    }
});



// Testing POST preorder structure of the response and status code
test.serial('Post /preorder successful', async(t) => {
    // Simulate a successful request to the /preorder endpoint
    const requestBody = {
        "price": 9,
        "name": "meat",
        "id": "106",
        "restaurant_name": "Restaurant"
    };
    try{
        const response = await t.context.got.post("preorder", {
            json: requestBody,
            responseType: 'json'
        });

        console.log('Response Status:', response.statusCode);
        console.log('Response Body:', response.body);

        t.is(response.statusCode, 200); // Check if the status code is 200
        t.deepEqual(response.body, requestBody);  // Assert the response body matches the expected result 
    } catch(err){
        console.error('Error: ', err.response.body);
        t.fail('Request failed with error: ', +err.message);
    }
});


// Testing POST /preorder fails when trying to create a duplicate preorder
// test.serial('POST /preorder fails when trying to create a duplicate preorder', async (t) => {
//     const duplicateRequestBody = {
//         price: 9,
//         name: "meat",
//         id: "106", // Same ID as an existing preorder
//         restaurant_name: "Restaurant" // Same restaurant_name as an existing preorder
//     };

//     // First, create the initial preorder
//     await t.context.got.post("preorder", {
//         json: duplicateRequestBody,
//         responseType: 'json'
//     });

//     // Attempt to create the duplicate preorder
//     try {
//         await t.context.got.post("preorder", {
//             json: duplicateRequestBody,
//             responseType: 'json'
//         });
//         t.fail('Request should have failed due to duplicate preorder.'); // This line should not be reached
//     } catch (err) {
//         t.is(err.response.statusCode, 400); // Expect a 400 Bad Request
//         t.is(err.response.body.message, 'Duplicate preorder with the same id and restaurant_name'); // Validate the error message
//     }
// });




//define a new test with the name /preorder fails when required fields are missing
//FAILURE CASE: The request should return a 400 status code.
test('POST /preorder fails when required fields are missing', async (t) => {
    const testCases = [
        {
            description: 'missing "price"',
            requestBody: {
                name: "meat",
                id: "106",
                restaurant_name: "Restaurant"
            },
            missingFields: ["price"]
        },
        {
            description: 'missing "name"',
            requestBody: {
                price: 9,
                id: "106",
                restaurant_name: "Restaurant"
            },
            missingFields: ["name"]
        },
        {
            description: 'missing "id"',
            requestBody: {
                price: 9,
                name: "meat",
                restaurant_name: "Restaurant"
            },
            missingFields: ["id"]
        },
        {
            description: 'missing "restaurant_name"',
            requestBody: {
                price: 9,
                name: "meat",
                id: "106"
            },
            missingFields: ["restaurant_name"]
        },
        {
            description: 'missing "price" and "name"',
            requestBody: {
                id: "106",
                restaurant_name: "Restaurant"
            },
            missingFields: ["price", "name"]
        },
        {
            description: 'missing "price" and "id"',
            requestBody: {
                name: "meat",
                restaurant_name: "Restaurant"
            },
            missingFields: ["price", "id"]
        },
        {
            description: 'missing "price" and "restaurant_name"',
            requestBody: {
                name: "meat",
                id: "106"
            },
            missingFields: ["price", "restaurant_name"]
        },
        {
            description: 'missing "name" and "id"',
            requestBody: {
                price: 9,
                restaurant_name: "Restaurant"
            },
            missingFields: ["name", "id"]
        },
        {
            description: 'missing "name" and "restaurant_name"',
            requestBody: {
                price: 9,
                id: "106"
            },
            missingFields: ["name", "restaurant_name"]
        },
        {
            description: 'missing "id" and "restaurant_name"',
            requestBody: {
                price: 9,
                name: "meat"
            },
            missingFields: ["id", "restaurant_name"]
        },
        {
            description: 'missing "price", "name", and "id"',
            requestBody: {
                restaurant_name: "Restaurant"
            },
            missingFields: ["price", "name", "id"]
        },
        {
            description: 'missing "price", "name", and "restaurant_name"',
            requestBody: {
                id: "106"
            },
            missingFields: ["price", "name", "restaurant_name"]
        },
        {
            description: 'missing "price", "id", and "restaurant_name"',
            requestBody: {
                name: "meat"
            },
            missingFields: ["price", "id", "restaurant_name"]
        },
        {
            description: 'missing "name", "id", and "restaurant_name"',
            requestBody: {
                price: 9
            },
            missingFields: ["name", "id", "restaurant_name"]
        },
        {
            description: 'missing all fields',
            requestBody: {},
            missingFields: ["price", "name", "id", "restaurant_name"]
        }
    ];

    for (const testCase of testCases) {
        const { description, requestBody, missingFields } = testCase;

        const error = await t.throwsAsync(() =>
            t.context.got.post('preorder', {
                json: requestBody,
                responseType: 'json'
            })
        );

        t.is(error.response.statusCode, 400, `Status code mismatch for: ${description}`);
        t.is(
            error.response.body.message,
            `Missing required field(s): ${missingFields.join(' ')}`,
            `Error message mismatch for: ${description}`
        );
    }
});



// Testing GET preorder by ID with restaurant_name as a query parameter
test.serial('Get /preorder/:id successful', async (t) => {
    const requestBody = {
        "price": 9,
        "name": "meat",
        "id": "106",
        "restaurant_name": "Restaurant"
    };

    try {
        const response = await t.context.got.get(`preorder/106`, {
            searchParams: { restaurant_name: "Restaurant" }
        });

        console.log('Response Status:', response.statusCode);
        console.log('Response Body:', response.body);


        t.is(response.statusCode, 200); // Check if the status code is 200
        t.deepEqual(response.body, requestBody); // Assert the response body matches the expected result
    } catch (err) {
        // Log the error response for more insights
        if (err.response) {
            console.error('Error Response Body: ', err.response.body);
            console.error('Error Response Status: ', err.response.statusCode);
        }
        t.fail('Request failed with error: ' + err.message);
    }
});

test.serial('Put /preorder/:id successful', async (t) => {
    const updatedBody = {
        price: 12,
        name: "grilled chicken",
        id: "106",
        restaurant_name: "Restaurant"
    };

    // console.log("I tested this !!!!!!!!!!!!!!!!!!!!!!!");
    // console.log('ID:!!!!!!!!!!!!!!!!!!!!', updatedBody.id, 'RESTAURANT_NAME:!!!!!!!!!!!!!!!!!!!!!!!!', updatedBody.restaurant_name);

    try {
        const response = await t.context.got.put(`preorder/106`, {
            json: updatedBody,
            searchParams: { restaurant_name: "Restaurant" }, // Include restaurant_name in the query
            responseType: 'json'
        });

        //console.log('Response Status:', response.statusCode);
        //console.log('Response Body:', response.body);

        t.is(response.statusCode, 200); // Expect a 200 status code
        t.deepEqual(response.body, { ...updatedBody, id: "106", restaurant_name: "Restaurant" }); // Check updated values
    } catch (err) {
        if (err.response) {
            console.error('Error Response Body: ', err.response.body);
            console.error('Error Response Status: ', err.response.statusCode);
        }
        t.fail('Request failed with error: ' + err.message);
    }
});


test.serial('Delete /preorder/:id successful', async (t) => {

    try {
        // Delete the preorder
        const response = await t.context.got.delete(`preorder/106`, {
            responseType: 'json'
        });

        console.log('Response Status:', response.statusCode);

        // Check the status code
        t.is(response.statusCode, 204); // Ensure 204 No Content
    } catch (err) {
        if (err.response) {
            console.error('Error Response Body: ', err.response.body);
            console.error('Error Response Status: ', err.response.statusCode);
        }
        t.fail('Request failed with error: ' + err.message);
    }
});

// Testing GET /preorder/:id fails with invalid ID
test.serial('GET /preorder/:id fails with invalid ID', async (t) => {
    try {
        // Step 1: Fetch existing preOrders
        const { body: preOrders } = await t.context.got('preorder', { responseType: 'json' });

        // Step 2: Generate a non-existing ID
        const existingIDs = preOrders.map(preOrder => preOrder.id);
        const invalidID = existingIDs.length ? Math.max(...existingIDs.map(Number)) + 1 : 9999;

        // Step 3: Attempt to fetch a non-existent preorder
        const error = await t.throwsAsync(() =>
            t.context.got.get(`preorder/${invalidID}`, {
                searchParams: { restaurant_name: 'Restaurant' },
            })
        );

        // Step 4: Validate the response
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, 'Preorder not found');
    } catch (err) {
        t.fail('Unexpected error: ' + err.message);
    }
});