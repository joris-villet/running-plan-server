const Event = require('../models/Event');
const User = require('../models/User');
const moment = require('moment');
require('../db');


module.exports = eventController = {
  create: async (req, res, next) => {
    console.log("formdata from eventForm => ", req.body)
    const newEvent = await Event.create(req.body);
    res.json({
      status: "success",
      newEvent: newEvent
    })
  },

  findAll: async (req, res, next) => {
    console.log(req.params.id)
    let events = await Event.find({
      userId: req.params.id,
    });

    events = events.map(el => {
      return {
        _id: el._id,
        date: moment(el.date).format('DD/MM/YYYY'),
        // date: el.date,
        time: el.time,
        trainingType: el.trainingType,
        weight: el.weight,
      }
    })

    res.json(events)
  },

  update: async (req, res, next) => {
    console.log("REQ BODY => ", req.body)
    
    const event = await Event.findById(req.params.id);

    await event.updateOne(req.body);

    res.json({
      status: "success",
    })
  },
}