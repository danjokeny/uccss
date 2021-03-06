//helpticket.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    HelpTicketContent = mongoose.model('HelpTicketContent'),
    HelpTicket = mongoose.model('HelpTicket'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    //HelpTicket Routes

    //post route to allow insert of both tickets and content
    router.post('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#1 - Creating HelpTicket & HelpTicketContent');

        //initialize
        var helpTicket = "";
        var helpTicketContent = "";

        //set vars to passed body content
        helpTicket = new HelpTicket(req.body.helpTicket);
        helpTicketContent = new HelpTicketContent(req.body.content);

        //perform the db insert
        await helpTicket.save()
            .then(result => {
                helpTicketContent.helpTicketId = result._id
                helpTicketContent.PersonID = helpTicket.PersonID
                helpTicketContent.save()
                    .then(content => {
                        res.status(201).json({ contentID: content._id });
                    })
            })
    }));

    //Get All helpTickets (check for Status parameter passed) & Sort on attribute passed
    //Sample: http://localhost:5000/api/helpTickets/
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#2 - Get all helpTickets');
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
 
    /*Get a specific helpTickets Request by passing id  - this is not in use
    //Sample: http://localhost:5000/api/helpTickets/5c037760a7bb2fb12ca389b8
    router.get('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#3 - Get specific helpTickets by id =  %s', req.params.id);
        let query = HelpTicket.findById(req.params.id)
        query.sort(req.query.order)
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' })
            .populate({ path: 'OwnerID', model: 'User', select: 'lname fname ' });
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));*/

    //Get all helptickets for a specific user only
    //Sample: http://localhost:5000//api/helptickets/user/5c04c36a9a5749f0f4cd9207
    router.get('/helpTickets/user/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#4 - Get all helpTickets for specific user id =  %s', req.params.id);

        //setup query for getting only tickets for this PersonID id
        let query = HelpTicket.find();
        query.where('PersonID').eq(req.params.id);
        query.populate({ path: 'PersonID', model: 'User', select: 'lname fname ' })
        query.populate({ path: 'OwnerID', model: 'User', select: 'lname fname ' });

        //execute the query
        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        })
    }));

    //update (PUT) request for both ticket and content
    router.put('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#5 - update PUT request for both ticket and content');

        var helpTicket = new HelpTicket(req.body.helpTicket);
        var helpTicketContent = new HelpTicketContent(req.body.content);
        helpTicketContent.helpTicketId = helpTicket._id
        helpTicketContent.PersonID = helpTicket.PersonID

        await HelpTicket.findOneAndUpdate({ _id: helpTicket._id }, helpTicket, { new: true })
            .then(result => {
                if (helpTicketContent) {
                    req.body.content.helpTicketId = result._id;
                    helpTicketContent.save()
                        .then(content => {
                            res.status(201).json({ contentID: content._id });
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));

    //Delete existing helpticket and content 
    router.delete('/helptickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#6 - deleting HelpTicket & HekpTicketConent for id' + req.params.id);

        let query = HelpTicket.remove();
        query.where('_id').eq(req.params.id);

        //delete the help ticket 
        await query.exec().then(result => {
            console.log(result);
        });

        //delete all the contents for the helpticket
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


    /*insert just a content record -- this is not in use
    router.post('/HelpTicketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#7 - Creating helpTicket Async Post');
        var helpticketcontent = new HelpTicketContent(req.body);
        await helpticketcontent.save()
            .then(result => {
                logger.log('info', 'Created helpticketcontent = ' + result);
                res.status(201).json(result);
            })
    })); */

    /* this is not in use
    //Get All HelpTicketContent (check for Status parameter passed)
    //Sort on attribute passed
    //Sample: http://localhost:5000/api/HelpTicketContent/
    router.get('/HelpTicketContent', asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#8 - Get all HelpTicketContent');
        let query = HelpTicketContent.find();
        //Sort on ?order
        query.sort(req.query.order)
            //Join with user table to get names
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        });
    }));*/


    //Get HelpTicketContent for a specific help ticket content id
    //Sample: http://localhost:5000/api/HelpTicketContent/helpTicket/5c053ebcc958b333f891ced2
    router.get('/HelpTicketContent/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#9 - Get all HelpTicketContent for helpticket = %s', req.params.id);
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


    /* this is not in use
    //Get All HelpTicketContent (check for Status parameter passed)
    //Sort on attribute passed
    router.get('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#10 - Get all HelpTicketContent');
        let query = HelpTicketContent.find();
        //Sort on ?order
        query.sort(req.query.order)
            //Join with user table to get names
            .populate({ path: 'PersonID', model: 'User', select: 'lname fname ' });

        await query.exec().then(result => {
            console.log(result);
            res.status(200).json(result);
        });
    }));*/


    /* this is not in use
    //Update existing helpticket row with json passed in raw body
    router.put('/HelpTicketContent', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#11 - Updating HelpTicketContent');
        await HelpTicketContent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'Updated HelpTicketContent =' + result);
                res.status(200).json(result);
            })
    })); */

    /*this is not in use
    //Delete existing HelpTicketContent
    //Sample:http://localhost:5000/api/HelpTicketContent/5c0377d0a7bb2fb12ca389bb
    router.delete('/HelpTicketContent/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#12 - Deleting HelpTicketContent =  %s', req.params.id);
        await HelpTicketContent.remove({ _id: req.params.id })
            .then(result => {
                logger.log('info', 'Deleted HelpTicketContent = %s', req.params.id);
                res.status(200).json(result);
            })
    }));*/


    //multer and mkdirp used for uploading files
    //configure path and filename use for strage
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + '/helpTickets';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            file.fileName = file.originalname;
            //cb(null, file.fieldname + '-' + Date.now());
            var getExtenstion = file.fieldname;
            var ext = getExtenstion.split('.').pop();
            var replStr = getExtenstion;
            var newItem = replStr.replace('.', '');
            var saveFileName = newItem + '-' + Date.now() + '.' + ext;
            cb(null, saveFileName);
        }
    });

    //save file middleware
    var upload = multer({ storage: storage });

    //upload a file
    router.post('/HelpTicketContent/helpTicket/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'server ticket route#13 - Uploading files');

        //retrieve the the ticket content just added
        await HelpTicketContent.findById(req.params.id).then(result => {

            for (var i = 0, x = req.files.length; i < x; i++) {
                var file = {
                    OriginalFileName: req.files[i].originalname,
                    FileName: req.files[i].filename
                };
                result.file = file;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));
};