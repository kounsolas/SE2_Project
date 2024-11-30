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
	try{
		t.context.server = http.createServer(app); // create the server

		const server = t.context.server.listen(); // Start listening on a random port
	
		const { port } = server.address();
	
		t.context.got = got.extend({responseType: "json", prefixUrl: `http://localhost:${port}`}); // Configure got to target the test server
	} catch(err){
		console.error('Error during setup: ', err);
		throw err; 
	}

});

test.after.always(async (t) => {
	try{
		await t.context.server.close();
	} catch(err) {
		console.error('Error closing the server: ', err);
		throw err;
	}
	
});

module.exports ={
	app, // Export the app
	got: (testInstance) => testInstance.context.got,
};