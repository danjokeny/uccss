var express = require('express');
var config = require('./config/config');
var logger = require('./config/logger');

var app = express();
var port = config.port
 
require('./config/express')(app, config);

require('http').createServer(app).listen(port, function () {
	logger.log('info', "HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});

