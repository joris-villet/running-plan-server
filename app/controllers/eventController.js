const { Event } = require('../models');
const dayjs = require('dayjs');
const fr = require('dayjs/locale/fr.js') 
dayjs.locale(fr)


module.exports = {

  create: async (req, res) => {
    try {

      console.log("userId => ", res.locals.userId)

      const newEvent = {
        date: req.body.date,
        time: req.body.time,
        trainingType: req.body.trainingType,
        weight: req.body.weight,
        userId: res.locals.userId
      }

      await Event.create(newEvent, {
        where: { user_id: res.locals.userId }
      });

      // console.log(data)
  
      // const newEvent =  data.dataValues;
      
      return res.send({
        status: "success",
        // newEvent: newEvent
      })
     
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }

  },

  findAll: async (req, res) => {
    try {
      console.log("RES LOCALS => ", res.locals)
      const events = await Event.findAll({
        where: { user_id: res.locals.userId }
      })

      return res.send(events);

    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }

  },

  update: async (req, res, next) => {
    try {
      
      const data = await Event.findByPk(req.params.id);
      // console.log(data)

      const event = data.dataValues;
  
      await Event.update(req.body, {
        where: { id: event.id }
      });
  
      res.json({
        status: "success",
      })

    } catch(err) {
      console.log(err);
      return res.status(500).send(err)
    }

  },

}

