const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const { requireAuth } = require('../middlewares/authMiddleware.js');

router
  .post('/user/register', userController.create)
  .post('/user/login', userController.login)
  // .get('/user', userController.findAll)
  // .get('/user/:id', userController.findOne)
  // .put('/user/:id', userController.update)
  // .get('/logout', userController.logout)
  .get('/auth', requireAuth)

module.exports = router;