var path = require('path');
var express = require('express');

/**
 * Proxy middleware
 * @type {httpProxyMiddleware}
 */
var proxy = require('http-proxy-middleware');
// Proxy configuration
var serviceProxy = proxy('/service', {
    target: 'https://dev.example.com',
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: function (proxyReq, req, res) {
        // Set 'My-Domain' as a custom header in requests
        proxyReq.setHeader('My-Domain', 'test');
    }
});

/**
 * Production node running the gulp minified version
 */
var prod = express();
// Assign localhost port 5000 if nothing else is set in config
prod.set('port', (process.env.PORT || 5000));



// Route every relative path as a static path to the  '/' (root) folder
prod.use(express.static(__dirname + '/build/'));

// Route every request starting with '/service' through the proxy
prod.use(serviceProxy);

// Route all GET requests to index.html
prod.get('*', function (req, res) {
    res.sendFile(path.resolve('./build/index.html'));
});


// Start node server and listen on port 5000
prod.listen(prod.get('port'), function () {
    console.log('Node prod is running on port', prod.get('port'));
});