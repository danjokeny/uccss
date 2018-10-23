//Database require
var mongoose = require('mongoose');

//Database Schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  registerDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'user', 'staff'] },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

//Database Connection
module.exports =
  mongoose.model('User', userSchema);