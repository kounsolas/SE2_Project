'use strict';

const path = require('path');
const http = require('http');

const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// swaggerRouter configuration
const options = {
    logging:true,
    mock: true,  
    routing: {
        controllers: path.join(__dirname, './controllers')
    }
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();


// Initialize the Swagger middleware
// Start the server only if not in a test environment
if(require.main === module){ 
    http.createServer(app).listen(serverPort, function () {
        // console.log("WHY NOT???");
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
}

module.exports = app;


