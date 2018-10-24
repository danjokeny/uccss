
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    User = mongoose.model('User');


module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/users', asyncHandler(async (req, res) => {
        //Get All Users Async Request
        //Sample: http://localhost:5000/api/users/
        logger.log('info','Get all users Async Request');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    })); 
        
/*
    router.route('/users/:id').get(function (req, res, next) {
        //Get specific User Request 
        //http://localhost:5000/api/users/id:danny
        console.log(req.body);
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get user = ' + req.params.id });
    });*/
    router.get('/users/:id', asyncHandler(async (req, res) => {
        //Get specific User Request 
        //http://localhost:5000/api/users/5bd0b6a95c60d3e2c4f1c3d4
        logger.log('info','Get specific user by id =  %s',req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result); 
        })
    }));
        


    router.route('/login').post(function (req, res, next) {
        //Get existing user request 
        //Login from html index page link
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
        logger.log('info', 'Login existing user ' + email);
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/create').post(function (req, res, next) {
        //create new user request 
        //create new userid from html index page link
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
        logger.log('info', 'Create a new user ' + email);
        var obj = { 'New user email': email, 'password': password };
        res.status(201).json(obj);
    });
      
    //create new user request 
    //api Post with json passed in raw body
    /*
    Sample:
    //http://localhost:5000/api/createNew
    {
        "fname" : "Amy",    
        "lname" : "Vankauwenberg",    
        "email" : "AmyV@nm.com",   
        "password" : "987654321",
        "role" : "admin"
    }*/
    router.post('/createNew', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating user Async Post');
        var user = new User(req.body);
        console.log(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));
        

    router.route('/update/:oldEmail/:newEmail').put(function (req, res, next) {
        //Update old email to new email 
        //Sample: 
        //  http://localhost:5000/api/update/oldEmail:dforero@uwm.edu/newEmail:danjokeny@gmail.com
        logger.log('info', 'Get user %s', req.params.id);
        var emailOld = req.params.oldEmail
        var emailNew = req.params.newEmail;
        res.status(200).json({
            message: 'Update(PUT) existing user = ' + emailOld
                + ' to now be = ' + emailNew
        });
    });

    router.route('/updatePW/:Email/:newPW').put(function (req, res, next) {
        //change password on existing user
        //Sample:
        //http://localhost:5000/api/updatePW/Email:dforero@uwm.edu/newPW:12345
        logger.log('info', 'Put user %s', req.params.Email + ' with new PW = ' + req.params.newPW);
        var Email = req.params.Email
        var newPW = req.params.newPW;
        res.status(200).json({
            message: 'Update(PUT) password for user = ' + Email
                + 'to now be = ' + newPW
        });
    });

    /*
    router.route('/Delete/:Email/').delete(function (req, res, next) {
        //Delete existing userid
        //sample:
        //http://localhost:5000/api/delete/Email:danjokeny@gmail.com
        logger.log('info', 'Get user %s', req.params.Email);
        var Email = req.params.Email
        res.status(200).json({ message: 'Delete user = ' + Email });
    });*/
    router.delete('/Delete/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user id =  %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
        })
    }));
        


    };
