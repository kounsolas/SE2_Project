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

//define a new test with the name /preorder fails when required fields are missing
//FAILURE CASE: The request should return a 400 status code.
// test('POST /preorder fails when required fields are missing', async (t) => {
//     const testCases = [
//         {
//             description: 'missing "price"',
//             requestBody: {
//                 name: "meat",
//                 id: "106",
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "name"',
//             requestBody: {
//                 price: 9,
//                 id: "106",
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "id"',
//             requestBody: {
//                 price: 9,
//                 name: "meat",
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "restaurant_name"',
//             requestBody: {
//                 price: 9,
//                 name: "meat",
//                 id: "106"
//             }
//         },
//         {
//             description: 'missing "price" and "name"',
//             requestBody: {
//                 id: "106",
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "price" and "id"',
//             requestBody: {
//                 name: "meat",
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "price" and "restaurant_name"',
//             requestBody: {
//                 name: "meat",
//                 id: "106"
//             }
//         },
//         {
//             description: 'missing "name" and "id"',
//             requestBody: {
//                 price: 9,
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "name" and "restaurant_name"',
//             requestBody: {
//                 price: 9,
//                 id: "106"
//             }
//         },
//         {
//             description: 'missing "id" and "restaurant_name"',
//             requestBody: {
//                 price: 9,
//                 name: "meat"
//             }
//         },
//         {
//             description: 'missing "price", "name", and "id"',
//             requestBody: {
//                 restaurant_name: "Restaurant"
//             }
//         },
//         {
//             description: 'missing "price", "name", and "restaurant_name"',
//             requestBody: {
//                 id: "106"
//             }
//         },
//         {
//             description: 'missing "price", "id", and "restaurant_name"',
//             requestBody: {
//                 name: "meat"
//             }
//         },
//         {
//             description: 'missing "name", "id", and "restaurant_name"',
//             requestBody: {
//                 price: 9
//             }
//         },
//         {
//             description: 'missing all fields',
//             requestBody: {}
//         }
//     ];

//     for (const testCase of testCases) {
//         const { description, requestBody } = testCase;

//         try {
//             await t.throwsAsync(() =>
//                 t.context.got.post('preorder', {
//                     json: requestBody,
//                     responseType: 'json'
//                 })
//             );
//         } catch (err) {
//             console.error(`Test Case Failed: ${description}`);
//             console.error('Response:', err.response?.body || 'No response body');
//             t.fail(`Unexpected behavior for ${description}`);
//         }
//     }
// });

// test('POST /preorder fails when required fields are missing', async (t) => {
//     const incompleteRequestBody = {
//       name: "meat", // Missing price, id, and restaurant_name
//     };
  
//     const error = await t.throwsAsync(() =>
//       t.context.got.post("preorder", {
//         json: incompleteRequestBody,
//         responseType: "json",
//       })
//     );
  
//     t.is(error.response.statusCode, 400);
//     t.is(
//       error.response.body.message,
//       "Missing required field(s): price id restaurant_name"
//     );
//   });
  

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









