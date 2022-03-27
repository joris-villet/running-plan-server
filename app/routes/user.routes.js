const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

router
  .post('/user/login', userController.login)
  .post('/user/register', userController.create)
  .get('/user', userController.findAll)
  .get('/user/:id', userController.findOne)
  .put('/user/:id', userController.update)
  .get('/logout', userController.logout)
  // .post('/auth/user', checkUser)

module.exports = router;