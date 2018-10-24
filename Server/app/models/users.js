//Database require
var mongoose = require('mongoose');

//Database Schema
var Schema = mongoose.Schema;
var rolesValid=['user', 'staff', 'admin']
var UserSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {type:String, enum: rolesValid},
  active: { type: Boolean, default: true },
  registerDate: { type: Date, default: Date.now }
});

console.log('userschema = ' + UserSchema)

//Database Connection
module.exports =
  mongoose.model('User', UserSchema);