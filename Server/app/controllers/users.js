
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users').get(function (req, res, next) {
        //Get All Users Request
        logger.log('info', 'Get all users');
        res.status(200).json({ message: 'Got All Users' })
    });
    
    router.route('/users/:id').get(function (req, res, next) {
        //Get specific User Request
        console.log(req.body);
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get user = ' + req.params.id });
    });

    router.route('/login/').get(function (req, res, next) {
        //Get existing user request / login
        console.log(req.body);
        var email = req.params.email
        var password = req.params.password;
        logger.log('info', 'Login(Get) existing user ' + email );
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/update/:oldEmail/:newEmail').put(function (req, res, next) {
        //Update old email to new email 
        logger.log('info', 'Get user %s', req.params.id);
        var emailOld = req.params.oldEmail
        var emailNew = req.params.newEmail;
        res.status(200).json({ message: 'Update(PUT) existing user = ' + emailOld 
        + ' to now be = ' + emailNew });
    });

    router.route('/updatePW/:Email/:newPW').put(function (req, res, next) {
        //change password on existing user
        logger.log('info', 'Put user %s', req.params.id);
        var Email = req.params.Email
        var newPW = req.params.newPW;
        res.status(200).json({ message: 'Update(PUT) password for user = ' + Email 
        + 'to now be = ' + newPW });
    });

    router.route('/Delete/:Email/').delete(function (req, res, next) {
        //Delete existing userid
        logger.log('info', 'Get user %s', req.params.id);
        var Email = req.params.Email
        res.status(200).json({ message: 'Delete user = ' + Email  });
    });
};
