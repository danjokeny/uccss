var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');


module.exports = function (app, config) {

  app.use(function (req, res, next) {
    logger.log('info', 'Request from ' + req.connection.remoteAddress);
    next();
  });

  app.use(morgan('dev'));

 // app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));


  app.use(express.static(config.root + '/public'));

  require('../app/controllers/users')(app, config);

  app.use(function (req, res) {
    logger.log('error', 'File not found');
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log('info', "Starting application");

};
