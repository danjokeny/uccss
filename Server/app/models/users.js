//Database require
var mongoose = require('mongoose');

//Database Schema
var Schema = mongoose.Schema;

//password encryption
var Bcrypt = require('bcryptjs');

//Users
var rolesValid = ['user', 'staff', 'admin'];
var UserSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, enum: rolesValid },
  active: { type: Boolean, default: true },
  registerDate: { type: Date, default: Date.now }
});


//preHook to save 
UserSchema.pre('save', function (next) {
  var person = this;
  if (this.isModified('password') || this.isNew) {
    Bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      Bcrypt.hash(person.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        person.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//compares PW entered in form and compares to encrypted password in database
UserSchema.methods.comparePassword = function (passw, cb) {
  Bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


//Database Connection to model
module.exports =
  mongoose.model('User', UserSchema);