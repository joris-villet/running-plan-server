const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const { checkUser } = require('./middlewares/authMiddleware');

// ROUTE VIEWS
router.get('/', mainController.homePage);


// ROUTE AUTHENTIFICATION
router.post('/auth/user', checkUser);

// ROUTE USER
router.post('/login', userController.login);
router.post('/user/register', userController.create);
router.get('/user', userController.findAll);
router.get('/user/:id', userController.findOne);
router.put('/user/:id', userController.update);
router.get('/logout', userController.logout);

//ROUTE EVENT
router.get('/event/:id', eventController.findAll);
router.post('/event', eventController.create);
router.put('/event/:id', eventController.update);



module.exports = router;