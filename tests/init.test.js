const http = require('http');
const test = require('ava');
const got = require('got');

const app = require( "../index.js")

test("Test passes", (t) => {
	t.pass();
});

// Testing the asynchronous messages of our server
test('Async' , async(t) => {
	const res = Promise.resolve('test');
	t.is(await res, 'test');
}); 

test.before(async (t) => {
	t.context.server = http.createServer(app); // create the server

	const server = t.context.server.listen(); // Start listening on a random port

	const { port } = server.address();

	t.context.got = got.extend({responseType: "json", prefixUrl: `http://localhost:${port}`}); // Configure got to target the test server
});

test.after.always((t) => {
	t.context.server.close();
});

test('Get /search returns correct response and status code', async(t) => {
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
	console.log('Test: Received response:', body);
	t.is(statusCode, 200); 
})