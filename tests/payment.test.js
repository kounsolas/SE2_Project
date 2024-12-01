const test = require('ava');
const got = require('./init.test.js');

test('POST /payBookingfee successful ', async (t) => {
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
    
        t.is(response.statusCode, 200);
        t.deepEqual(response.body, { success: true });
    } catch(err){
        console.error('Error: ', err.response.body);
        t.fail('Request failed with error: ', +err.message);
    }


});

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