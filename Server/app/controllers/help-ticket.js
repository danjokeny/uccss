//helpticket.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    HelpTicketContent = mongoose.model('HelpTicketContent'),
    HelpTicket = mongoose.model('HelpTicket'),
    //passportService = require('../../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    //HelpTicket Routes

    //post route to allow insert of both tickets and content
    router.post('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', '***************************************');
        logger.log('info', 'Creating HelpTicket & HelpTicektContent');

        var helpTicket = "";
        var helpTicketContent = "";
        helpTicket = new HelpTicket(req.body.helpTicket);
        helpTicketContent = new HelpTicketContent(req.body.content);

        logger.log('info', 'Creating helpTicket = ' + helpTicket);
        logger.log('info', 'Creating helpTicketContent = ' + helpTicketContent);

        await helpTicket.save()
            .then(result => {
                logger.log('info', 'inside save helpticket');
                logger.log('info', 'result._id =' + result._id);

                helpTicketContent.helpTicketId = result._id
                logger.log('info', 'helpTicketContent.helpTicketId =' + helpTicketContent.helpTicketId);

                helpTicketContent.PersonID = helpTicket.PersonID
                logger.log('info', 'helpTicketContent.PersonID =' + helpTicketContent.PersonID);

                logger.log('info', 'inserting row for  content = ' + helpTicketContent);

                helpTicketContent.save()
                    .then(result => {
                        logger.log('info', 'inside save content');
                        res.status(201).json(result);
                    })
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

    //update (PUT) request for both ticket and content
    router.put('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        
        logger.log('info', 'Updating HelpTicket & HekpTicketConent');
        logger.log('info', '======================================');
        
        var helpTicket = new HelpTicket(req.body.helpTicket);
        var helpTicketContent = new HelpTicketContent(req.body.content);

        logger.log('info', 'Pre populate helpTicket = ' + helpTicket);
        logger.log('info', 'pre populate helpTicketContent = ' + helpTicketContent);

        helpTicketContent.helpTicketId = helpTicket._id
        logger.log('info', 'helpTicketContent.helpTicketId =' + helpTicketContent.helpTicketId);

        helpTicketContent.PersonID = helpTicket.PersonID
        logger.log('info', 'helpTicketContent.PersonID =' + helpTicketContent.PersonID);

        logger.log('info', '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        logger.log('info', 'intent to insert row for  content = ' + helpTicketContent);

        await HelpTicket.findOneAndUpdate({ _id: helpTicket._id }, helpTicket, { new: true })
            .then(result => {
                if (helpTicketContent) {
                    helpTicketContent.save()
                        .then(result => {
                            res.status(201).json(result);
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));

    //Delete existing helpticket and content 
    router.delete('/helptickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'deleting HelpTicket & HekpTicketConent for id' + req.params.id);

        let query = HelpTicket.remove();
        query.where('_id').eq(req.params.id);

        await query.exec().then(result => {
            console.log(result);
        });

        await query.exec().then(result => {
            console.log(result);
            query = HelpTicketContent.remove()
            query.where('helpTicketId').eq(req.params.id);
            query.exec().then(result => {
                console.log(result);
            });
        });
        res.status(200).json(result);
    }));


    //HelpTicketContent Routes


    //insert just a content record
    router.post('/HelpTicketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Async Post');
        var helpticketcontent = new HelpTicketContent(req.body);
        await helpticketcontent.save()
            .then(result => {
                logger.log('info', 'Created helpticketcontent = ' + result);
                res.status(201).json(result);
            })
    }));

    //do we need this?
    //Get All HelpTicketContent (check for Status parameter passed)
    //Sort on attribute passed
    //Sample: http://localhost:5000/api/HelpTicketContent/
    router.get('/HelpTicketContent', asyncHandler(async (req, res) => {
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


    //Get HelpTicketContent for a specific help ticket content id
    //Sample: http://localhost:5000/api/HelpTicketContent/helpTicket/5c053ebcc958b333f891ced2
    router.get('/HelpTicketContent/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTicketContent for helpticket = %s', req.params.id);
        let query = HelpTicketContent.find()
        query.populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        //check the helpTicketId that matches the GET URL
        if (req.params.id) {
            query.where('helpTicketId').eq(req.params.id);
        };

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        })
    }));


    //do we need this route???????
    //Get All HelpTicketContent (check for Status parameter passed)
    //Sort on attribute passed
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



    //Update existing helpticket row with json passed in raw body
    //do we need this route?
    router.put('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicketContent');
        await HelpTicketContent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'Updated HelpTicketContent =' + result);
                res.status(200).json(result);
            })
    }));

    //do we need this route?
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