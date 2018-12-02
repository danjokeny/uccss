//helpticket.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    HelpTicketContent = mongoose.model('HelpTicketContent');
    HelpTicket = mongoose.model('HelpTicket');

module.exports = function (app, config) {
    app.use('/api', router);

        logger.log('info', 'inside helpticket routes controller');

    //API calls below

    /*create new helpTickets api Post request with json passed in raw body
    Sample: http://localhost:5000/api/helpTickets
    {
    "Title": "Mr.",
    "PersonID": "5bd080482c9c2a74ecf2ace3",
    "OwnerID": "5c02f00eef1abf258882cc24",
    "Status": "new"
    }
    */
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Async Post');
        var helpticket = new HelpTicket(req.body);
        console.log(req.body);
        await helpticket.save()
            .then(result => {
                res.status(201).json(result);
            })
    }));

};