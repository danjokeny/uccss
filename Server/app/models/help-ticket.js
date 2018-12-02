//Database require
var mongoose = require('mongoose');

//Database Schema
var Schema = mongoose.Schema;

//Help tickets contentschema
var HelpTicketContentSchema = new Schema({
    PersonID: { type: Schema.Types.ObjectId, require: true },
    Content: { type: String },
    DateCreated: { type: Date, default: Date.now },
    helpTicketId: { type: Schema.Types.ObjectId, require: true },
    file: {
        FileName: { type: String },
        OriginalFileName: { type: String }
    }
});

//Database Connection
module.exports =
    mongoose.model('HelpTicketContent', HelpTicketContentSchema);

//Help tickets schema
var statusValid = ['new', 'inProcess', 'closed'];
var HelpTicketSchema = new Schema({
    Title: { type: String, require: true },
    PersonID: { type: Schema.Types.ObjectId, require: true },
    OwnerID: { type: Schema.Types.ObjectId, require: true },
    Status: { type: String, enum: statusValid, require: true },
    DateCreated: { type: Date, default: Date.now }
});

//Database Connection
module.exports =
    mongoose.model('HelpTicket', HelpTicketSchema);