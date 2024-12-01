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
test.serial("Get /preorder returns correct response and status code", async(t) => {
    try{
        const {body, statusCode} = await t.context.got("preorder"); // Send GET request to /preorder endpoint (from the preorder controller)
        t.deepEqual(body, [ // Check if the response body matches the expected result
            {
                price: 7,
                name: "salat",
                id: "105",
                restaurant_name: "Mamalouka"
            },
            {
                price: 8,
                name: "pasta",
                id: "110",
                restaurant_name: "Pastabar"
            }
        ]);
        t.is(statusCode, 200);
    } catch(err){
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
