
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
};
