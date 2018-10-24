//Database require
var mongoose = require('mongoose');

//Database Schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  registerDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

console.log('userschema = ' + UserSchema)

//Database Connection
module.exports =
  mongoose.model('User', UserSchema);