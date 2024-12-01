const test = require('ava');  //import the ava framework used for running tests
const got = require('./init.test.js');   //import the custom got instance defined in "init.tests.js"

// define a new test with the name POST /payBookingfee successful
// SUCCESS CASE: The request should return a 200 status code and a JSON object with the key "success" set to true.
test('POST /payBookingfee successful ', async (t) => 
    // Simulate a successful request to the /payBookingfee endpoint
    {    
    const requestBody = { 
        "cardHolderName": "John Doe",
        "cardNumber": "12345678912345680000",
        "CVC":123,
        "expirationDate": "07/2026"
    };
    try{
        const response = await t.context.got.post('payBookingfee', {
            json: requestBody,
            responseType: 'json'
        });
    
        console.log('Response Status:', response.statusCode);
        console.log('Response Body:', response.body);   
    
        t.is(response.statusCode, 200); // Check if the status code is 200
        t.deepEqual(response.body, { success: true });  // Assert the response body matches the expected result
    } catch(err){
        console.error('Error: ', err.response.body);
        t.fail('Request failed with error: ', +err.message);
    }


});

// define a new test with the name POST /payBookingfee fails when required fields are missing
// FAILURE CASE: The request should return a 400 status code.
test('POST /payBookingfee fails when required fields are missing', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "12345678912345680000",
        "expirationDate": "07/2026"
        // Missing "CVC" 
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingfee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});