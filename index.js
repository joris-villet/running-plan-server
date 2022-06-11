
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('express-async-errors');

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

// app.use(cors('*'));
app.use(cors(corsOptions));
// console.log("je passe avant les routes")

// const { checkUser } = require('./app/middlewares/authMiddleware');
// app.use(checkUser);

const { userRouter, eventRouter } = require('./app/routes');
app.use(userRouter, eventRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`App listening to http://localhost:${port}`)
})










