const test = require('ava');
const got = require('./init.test');

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

// test('GET /search handles missing data gracefully', async (t) => {
//     // Mock the service to return an empty array or no data
//     const originalSearchService = require('../service/SearchService').searchGET;
//     require('../service/SearchService').searchGET = () => Promise.resolve([]);

//     const {body, statusCode} = await t.context.got('search');

//     t.is(statusCode, 200);  // Ensure it returns a 200 status
//     t.deepEqual(body, []);   // Check that the body is an empty array (no data)

//     // Restore original service method
//     require('../service/SearchService').searchGET = originalSearchService;
// });

// test('searchGET should handle service errors', async (t) => {
//     // Mock the service to reject with an error
//     sinon.stub(SearchService, 'searchGET').rejects(new Error('Server Error'));

//     const req = {};
//     const res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.stub(),
//     };

//     await SearchController.searchGET(req, res);

//     t.true(res.status.calledWith(500));
//     t.true(res.json.calledWith({ error: 'Server Error' }));

//     // Restore the original service function
//     SearchService.searchGET.restore();
// });

// test('GET /search handles service timeout gracefully', async (t) => {
//     // Mock the service to simulate a timeout
//     const originalSearchService = require('../service/SearchService').searchGET;
//     require('../service/SearchService').searchGET = () => new Promise((_, reject) => setTimeout(() => reject(new Error('Request Timeout')), 1000));

//     const error = await t.throwsAsync(() => t.context.got('search'));

//     t.is(error.response.statusCode, 500);  // Ensure the status code is 500 for server error due to timeout

//     // Restore original service method
//     require('../service/SearchService').searchGET = originalSearchService;
// });


// test('GET /search handles service error gracefully', async (t) => {
//     // Mock the service to throw an error
//     const original = require('../service/SearchService').searchGET;
//     var newService = require('../service/SearchService').searchGET;

//     newService = () => Promise.reject(new Error('Database error'));

//     const error = await t.throwsAsync(() => t.context.got('search'));
//     t.is(error.response.statusCode, 500);

//     // Restore original implementation
//     require('../service/SearchService').searchGET = original;
// });

