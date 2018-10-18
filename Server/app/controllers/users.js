
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users').get(function (req, res, next) {
        logger.log('info', 'Get all users');
        res.status(200).json({ message: 'Got All Users' })
    });
    
    router.route('/users/:id').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get user = ' + req.params.id });
    });
    
    router.route('/login').post(function (req, res, next) {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
        logger.log('info', 'Created(POST) new user ' + email );
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/update').put(function (req, res, next) {
        console.log(req.body);
        var email = req.body.email
        var emailNew = req.body.email2;
        logger.log('info', 'Updated(PUT) existing user ' + email + ' to ' + emailNew );
        var obj = { 'Existing email': email, 'New Email': emailNew };
        res.status(201).json(obj);
    });  


};
