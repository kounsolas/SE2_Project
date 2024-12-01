const test = require('ava');
const got = require('./init.test');

// Testing if the response time is lower than 200ms
test.serial('GET /search acceptable time response', async (t) => {
    const start = Date.now();
    await t.context.got('search');
    const duration = Date.now() - start;
    t.true(duration < 200);
});

test('Get /search returns correct structure', async (t) => {
    try{
        const {body, statusCode} = await t.context.got('search');
        t.is(statusCode, 200); // Checking if we received the correct status code
        body.forEach((item) => {
            t.truthy(item.address);
            t.truthy(item.restaurantName);
        });
    } catch(err){
        console.log('Error: ', err);
        throw err;
    }
});

test('Get /search returns correct response and status code', async(t) => {
	try {
        const {body, statusCode} = await t.context.got("search"); // Send GET request to /search endpoint (from the search controller)
        t.deepEqual(body, [
            {
                address: 'Leoforou Stratou 34',
                restaurantName: 'Mamalouka',
            },
            {
                address: 'Tsimiski 20',
                restaurantName: 'Estrella',
            },
        ]);
        // console.log('Test: Received response:', body);
        t.is(statusCode, 200); 
    } catch(err){
        console.log('Error : ', err);
        throw err;
    }
});

// Testing if the response time is lower than 500ms
test('GET /search acceptable time response', async (t) => {
    const start = Date.now();
    await t.context.got('search');
    const duration = Date.now() - start;
    t.true(duration < 500);
});
// testing POST method
test('POST /search returns 405 method not allowed', async(t) => {
    try{
        const error = await t.throwsAsync(() => t.context.got.post("search"));
        t.is(error.response.statusCode, 405);
    } catch(err){
        console.log('Error : ', err);
        throw err;
    }
});

// testing PUT method
test('PUT /search returns 405 method not allowed', async(t) => {
    try{
        const error = await t.throwsAsync(() => t.context.got.put("search"));
        t.is(error.response.statusCode, 405);
    } catch(err){
        console.log('Error: ', err);
        throw err;
    }
});

// testing DELETE method
test('DELETE /search returns 405 method not allowed', async(t) => {
    try{
        const error = await t.throwsAsync(() => t.context.got.delete("search"));
        t.is(error.response.statusCode, 405);
    } catch(err){
        console.log('Error: ', err);
        throw err;
    }
});

// Check for invalid endpoint
test('GET /search returns 404 for non-existent endpoint', async (t) => {
    const error = await t.throwsAsync(() => t.context.got('nonexistentendpoint'));

    t.is(error.response.statusCode, 404);  
});

