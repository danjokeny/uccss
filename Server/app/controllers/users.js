//users.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    User = mongoose.model('User'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app, config) {
    app.use('/api', router);

    //Get All Users Async Request
    //Sample: http://localhost:5000/api/users/
    router.get('/users', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server route#1 - Get all users Async Request');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    //Get specific User id Request 
    //Sample: http://localhost:5000/api/users/5bd080092c9c2a74ecf2ace2
    router.get('/users/:id',  requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', ' server route#2 - Get specific user by id =  %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //create new user api Post request with json passed in raw body
    //Sample: http://localhost:5000/api/users
    /*{
        "fname" : "Amy",    
        "lname" : "Vankauwenberg",    
        "email" : "AmyV@nm.com",   
        "password" : "987654321",
        "role" : "admin"
    }*/
    router.post('/users', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'server route#3 - Creating user Post insert');
    var user = new User(req.body);
    console.log(req.body);
    await user.save()
        .then(result => {
            res.status(201).json(result);
        })
    }));

    //Update existing data row with json passed in raw body
    //Sample:http://localhost:5000/api/users
    /*{ "active": false,
        "_id": "5bd080092c9c2a74ecf2ace2",
        "fname": "Danny",
        "lname": "Forero",
        "email": "danjokeny@gmail.com", <--must not change/unique key
        "password": "Pass12345",
        "role": "admin",
        "registerDate": "2018-10-24T14:22:01.128Z",
        "__v": 0
    }*/
    router.put('/users', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server route#4 - Updating user PUT');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    //Delete existing data
    //Sample:http://localhost:5000/api/users/5bd080092c9c2a74ecf2ace2
    router.delete('/users/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'server route#5 - Deleting user id =  %s', req.params.id);
    await User.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
    }));

    //Route to update password 
    //sample: http://localhost:5000/api/users/password/5c0499e21de9777271803cf1
    /*{
        "password": "GWTW1939"

    }*/
    router.put('/users/password/:userId', requireAuth, function (req, res, next) {
        logger.log('server route#6 - Update user password ' + req.params.userId, 'verbose');
        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }
                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/users/login').post(requireLogin, login);

};
