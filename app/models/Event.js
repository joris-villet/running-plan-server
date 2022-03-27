const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema =  new Schema({
  date: {
    type: Date
  } ,
  time: String,
  trainingType: String,
  weight: Number,
  userId: String
});
  
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;