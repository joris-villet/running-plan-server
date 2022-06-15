if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 7000;
const { userRouter } = require('./app/routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// const { checkUser } = require('./app/middlewares/authMiddleware');
// app.use(checkUser);

app.use(userRouter);

app.listen(port, () => {
  console.log(`App listening to http://localhost:${port}`)
})










