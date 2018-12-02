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
        await helpticket.save()
            .then(result => {
                logger.log('info', 'Creating helpTicket = ' + result);
                res.status(201).json(result);
            })
    }));

    //Get All helpTickets (check for Status parameter passed)
    //Sort on attribute passed
    //Sample: http://localhost:5000/api/helpTickets/
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        let query = HelpTicket.find();
        //Sort on ?order
        query.sort(req.query.order)
            //Join with user table to get names
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' })
            .populate({ path: 'OwnerID', model: 'User', select: 'lname fname ' });


        //check the Status that matches the GET URL
        if (req.query.Status) {
            if (req.query.Status[0] == '-') {
                query.where('Status').ne(req.query.Status.substring(1));
            } else {
                query.where('Status').eq(req.query.Status);
            }
        };

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        });
    }));

    //Get specific helpTickets Request 
    //Sample: http://localhost:5000/api/helpTickets/5c037760a7bb2fb12ca389b8
    router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific helpTickets by id =  %s', req.params.id);
        let query = HelpTicket.findById(req.params.id)
        query.sort(req.query.order)
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' })
            .populate({ path: 'OwnerID', model: 'User', select: 'lname fname ' });
        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        })
    }));

    //Update existing helpticket row with json passed in raw body
    //Sample:http://localhost:5000/api/helpTickets/5c037743a7bb2fb12ca389b7
    /*{
    "_id": "5c037743a7bb2fb12ca389b7",
    "Title": "Mr.",
    "PersonID": "5bd312221d702b16809db1bd",
    "OwnerID":  "5c02f00eef1abf258882cc24",
    "Status": "new",
    "DateCreated": "2018-12-02T06:10:11.768Z"
    }*/
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating helpTickets');
        await HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'Updated helpTicket =' + result);
                res.status(200).json(result);
            })
    }));

};