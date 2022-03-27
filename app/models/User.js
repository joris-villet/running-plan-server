const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema =  new Schema({
  firstname:  String, // String is shorthand for {type: String}
  lastname: String,
  email: String,
  password: String,
  events: Object
});
  
const User = mongoose.model('User', UserSchema);

module.exports = User;