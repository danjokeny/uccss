//helpticket.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    HelpTicketContent = mongoose.model('HelpTicketContent'),
    HelpTicket = mongoose.model('HelpTicket'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    //HelpTicket Routes

    /*comment out to replace with combination post for helpticket and helpticketconent
    create new helpTickets api Post request with json passed in raw body
    Sample: http://localhost:5000/api/helpTickets
    {
    "Title": "Mr.",
    "PersonID": "5bd080482c9c2a74ecf2ace3",
    "OwnerID": "5c02f00eef1abf258882cc24",
    "Status": "new"
    }
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Async Post');
        var helpticket = new HelpTicket(req.body);
        await helpticket.save()
            .then(result => {
                logger.log('info', 'Creating helpTicket = ' + result);
                res.status(201).json(result);
            })
    }));*/

    router.post('/helpTickets',requireAuth,  asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket & HelpTicektContent');
        var helpTicket = new HelpTicket(req.body.helpTicket);
        await helpTicket.save()
            .then(result => {
                req.body.content.helpTicketId = result._id;
                var helpTicketContent = new HelpTicketContent(req.body.content);
                helpTicketContent.save()
                    .then(content => {
                        res.status(201).json(result);
                    })
            })
    }));

    //Get All helpTickets (check for Status parameter passed)
    //Sort on attribute passed
    //Sample: http://localhost:5000/api/helpTickets/
    router.get('/helpTickets',requireAuth,  asyncHandler(async (req, res) => {
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
    router.get('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
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

    /*comment out to replace with PUT to update both helpticket and helptticketcontent together
    Update existing helpticket row with json passed in raw body
    //Sample:http://localhost:5000/api/helpTickets/5c037743a7bb2fb12ca389b7
    {
    "_id": "5c037743a7bb2fb12ca389b7",
    "Title": "Mr.",
    "PersonID": "5bd312221d702b16809db1bd",
    "OwnerID":  "5c02f00eef1abf258882cc24",
    "Status": "new",
    "DateCreated": "2018-12-02T06:10:11.768Z"
    }
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating helpTickets');
        await HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'Updated helpTicket =' + result);
                res.status(200).json(result);
            })
    }));*/

    router.put('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicket & HekpTicketConent');
        console.log(req.body)
        await HelpTicket.findOneAndUpdate({ _id: req.body.helpTicket._id }, req.body.helpTicket, { new: true })
            .then(result => {
                if (req.body.content) {
                    req.body.content.helpTicketId = result._id;
                    var helpTicketContent = new HelpTicketContent(req.body.content);
                    helpTicketContent.save()
                        .then(content => {
                            res.status(201).json(result);
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));


    //Delete existing helpticket
    //Sample:http://localhost:5000/api/helpTickets/5c0377d0a7bb2fb12ca389bb
    router.delete('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting helpTicket =  %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                logger.log('info', 'Deleted helpTicket = %s', req.params.id);
                res.status(200).json(result);
            })
    }));


    //HelpTicketContent Routes

    /*create new HelpTicketContent  Post request with json passed in raw body
        Sample: http://localhost:5000/api/HelpTicketContent
        {
            "PersonID": "5c035307ef1abf258882cc37",
            "Content":"need a new job too",
            "helpTicketId": "5c037760a7bb2fb12ca389b8",
            "file": {
                "FileName": "Filename here",
                "OriginalFileName": "original filename here"
            }
        }
    */
    router.post('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Async Post');
        var helpticketcontent = new HelpTicketContent(req.body);
        await helpticketcontent.save()
            .then(result => {
                logger.log('info', 'Created helpticketcontent = ' + result);
                res.status(201).json(result);
            })
    }));

    //Get All HelpTicketContent (check for Status parameter passed)
    //Sort on attribute passed
    //Sample: http://localhost:5000/api/HelpTicketContent/
    router.get('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTicketContent');
        let query = HelpTicketContent.find();
        //Sort on ?order
        query.sort(req.query.order)
            //Join with user table to get names
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        });
    }));



    //Get HelpTicketContent for a specific help ticket
    //Sample: http://localhost:5000/api/helpTicketContents/helpTicket/5c037760a7bb2fb12ca389b8
    router.get('/helpTicketContent/helpTicket', requireAuth, asyncHandler(async (req, res) => {
        let query = HelpTicketContent.find()
        query.populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        //check the helpTicketId that matches the GET URL
        logger.log('info', 'Get all HelpTicketContent for helpticket = ' + req.query.helpTicketId);
        if (req.query.helpTicketId) {
            if (req.query.helpTicketId[0] == '-') {
                query.where('helpTicketId').ne(req.query.helpTicketI.substring(1));
            } else {
                query.where('helpTicketId').eq(req.query.helpTicketId);
            }
        };

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        })
    }));

    //Get specific HelpTicketContent Request 
    //Sample: http://localhost:5000/api/HelpTicketContent/5c04006a9b566efae0378c22
    router.get('/HelpTicketContent/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific HelpTicketContent by id =  %s', req.params.id);
        let query = HelpTicketContent.findById(req.params.id)
        query.populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        })
    }));

    //Update existing helpticket row with json passed in raw body
    //Sample:http://localhost:5000/api/HelpTicketContent/
    /*    {
        "file": {
            "FileName": "Filename here",
            "OriginalFileName": "original filename here"
        },
        "_id": "5c03ff189b566efae0378c1c",
        "PersonID": "5c035307ef1abf258882cc37",
        "Content": "help me with my christmas decorating please",
        "helpTicketId": "5c037760a7bb2fb12ca389b8",
        "DateCreated": "2018-12-02T15:49:44.209Z",
        "__v": 1
    }*/
    router.put('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicketContent');
        await HelpTicketContent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'Updated HelpTicketContent =' + result);
                res.status(200).json(result);
            })
    }));

    //Delete existing HelpTicketContent
    //Sample:http://localhost:5000/api/HelpTicketContent/5c0377d0a7bb2fb12ca389bb
    router.delete('/HelpTicketContent/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting HelpTicketContent =  %s', req.params.id);
        await HelpTicketContent.remove({ _id: req.params.id })
            .then(result => {
                logger.log('info', 'Deleted HelpTicketContent = %s', req.params.id);
                res.status(200).json(result);
            })
    }));

};