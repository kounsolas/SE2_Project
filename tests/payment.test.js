const test = require('ava');  //import the ava framework used for running tests
const got = require('./init.test.js');   //import the custom got instance defined in "init.tests.js"

test('POST /payBookingFee successful ', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC":123,
        "expirationDate": "07/2026"
    };
    try{
        const response = await t.context.got.post('payBookingFee', {
            json: requestBody,
            responseType: 'json'
        });
    
        // console.log('Response Status:', response.statusCode);
        // console.log('Response Body:', response.body);   
    
        t.is(response.statusCode, 200); // Check if the status code is 200
        t.deepEqual(response.body, { success: true });  // Assert the response body matches the expected result
    } catch(err){
        console.error('Error: ', err.response.body);
        t.fail('Request failed with error: ', +err.message);
    }

});

// define a new test with the name POST /payBookingfee fails when required fields are missing
// FAILURE CASE: The request should return a 400 status code.
test('POST /payBookingFee fails when "CVC" is missing', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "expirationDate": "07/2026"
        // Missing "CVC" 
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test.serial('POST /payBookingFee fails when "expirationDate" is missing', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC": 123
        // Missing "expirationDate" 
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test.serial('POST /payBookingFee fails when "cardHolderName" is missing', async (t) => {
    const requestBody = {
        //"cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC": 123,
        "expirationDate": "07/2026"
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test.serial('POST /payBookingFee fails when "cardNumber" is missing', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        //"cardNumber": "12345678912345680000",
        "CVC": 123,
        "expirationDate": "07/2026"
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});


test.serial('POST /payBookingFee fails when everything is missing', async (t) => {
    const requestBody = {
        "cardHolderName": null,
        "cardNumber": null,
        "CVC": null,
        "expirationDate":null
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test('PUT /payBookingFee returns 405 method not allowed', async (t) => {
    const requestBody = { 
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC":123,
        "expirationDate": "07/2026"
    };

    try{
        const error = await t.throwsAsync(() => t.context.got.put('payBookingFee', {
            json: requestBody,
            responseType: 'json'
        }));
        t.is(error.response.statusCode, 405);
    } catch(err){
        console.log('Error : ', err);
        throw err;
    }
});

test('GET /payBookingFee returns 405 method not allowed', async (t) => {
    try{
        const error = await t.throwsAsync(() => t.context.got('payBookingFee'));
        t.is(error.response.statusCode, 405);
    }  catch(err){
        console.log('Error: ', err);
        throw err;
    }

});

test('DELETE /payBookingFee returns 405 method not allowed', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC": 123,
        "expirationDate": "07/2026"
    };
    try{
        const error = await t.throwsAsync(() => t.context.got.delete('payBookingFee'));
        t.is(error.response.statusCode, 405);
    }  catch(err){
        console.log('Error: ', err);
        throw err;
    }

});

test.serial('POST /payBookingFee fails with invalid CVC', async (t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC": "ABC",  // Invalid CVC
        "expirationDate": "07/2026"
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test.serial('POST /payBookingFee fails with overly long card holder name', async (t) => {
    const requestBody = {
        "cardHolderName": "A".repeat(300),  // Excessively long name
        "cardNumber": "1234567891234568",
        "CVC": 123,
        "expirationDate": "07/2026"
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test.serial('POST /payBookingFee fails with wrong name input', async (t) => {
    const requestBody = {
        "cardHolderName": "John$%Doe",  // wrong name
        "cardNumber": "1234567891234568",
        "CVC": 123,
        "expirationDate": "07/2026"
    };

    const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
        json: requestBody,
        responseType: 'json'
    }));

    t.is(error.message, 'Response code 400 (Bad Request)');
});

test('POST /payBookingFee fails with invalid card number', async(t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "123456789123456kajshd",
        "CVC" : 123,
        "expirationDate": "07/2026"
    };

    try {
        const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
            json: requestBody,
            responseType: 'json'
        }));
        t.is(error.message, 'Response code 400 (Bad Request)');
    } catch(err){
        console.log('Error: ', err);
        throw err;
    }
});

test('POST /payBookingFee fails with invalid CVC input', async(t) => {
    const requestBody = {
        "cardHolderName": "John Doe",
        "cardNumber": "1234567891234568",
        "CVC":123124,
        "expirationDate":"07/2026"
    };

    try{
        const error = await t.throwsAsync(() => t.context.got.post('payBookingFee', {
            json: requestBody,
            responseType: 'json'
        }));
        t.is(error.message, 'Response code 400 (Bad Request)');
    } catch(err) {
        console.log('Error: ', err);
        throw err;
    }
});

test('POST /payBookingFee fails with invalid Date input', async(t) => {
    const requestBody = {
        "cardHolderName":"John Doe",
        "cardNumber": "1234567891234568",
        "CVC":123,
        "expirationDate":"19/09"
    };

    try{
        const error = await t.throwsAsync(() => t.context.got.post("payBookingFee", {
            json: requestBody,
            responseType: 'json'
        }));
        t.is(error.message, 'Response code 400 (Bad Request)');
    } catch(err) {
        console.log('Error: ', err);
        throw err;
    }
});
