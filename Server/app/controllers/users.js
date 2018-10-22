
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
        console.log(req.body);
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get user = ' + req.params.id });
    });

    router.route('/updatePW/:Email/:newPW').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        var Email = req.params.Email
        var newPW = req.params.newPW;
        res.status(200).json({ message: 'Update password for user = ' + Email 
        + 'to now be = ' + newPW });
    });

    router.route('/update/:oldEmail/:newEmail').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        var emailOld = req.params.oldEmail
        var emailNew = req.params.newEmail;
        res.status(200).json({ message: 'Update existing user = ' + emailOld 
        + 'to now be = ' + emailNew });
    });
     
    router.route('/login').post(function (req, res, next) {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
        logger.log('info', 'Created(POST) new user ' + email );
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/Delete/:Email/').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        var Email = req.params.Email
        res.status(200).json({ message: 'Delete user = ' + Email  });
    });
};
