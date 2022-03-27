const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController.js');

router
  .post('/event', eventController.create)
  .get('/event', eventController.findAll)
  //.get('/event/:id', eventController.findOne)
  .put('/event/:id', eventController.update)
  // .get('/logout', eventController.logout)
  // .post('/auth/user', checkUser)

module.exports = router;