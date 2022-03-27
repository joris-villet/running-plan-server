const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'the secret sentence', {
    expiresIn: maxAge,
  });
}

module.exports = userController = {

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const [user] = await User.find({ email: email});

      console.log(email);
      console.log(user)
      
      if (!user) {
        res.status(500).json({
          status: false,
          message: "email pas trouvée"
        })
      }

       bcrypt.compare(password, user.password, async (_, response) => {
        console.log()
        if (!response) {
          res.status(500).json("email ou mot de passe incorrect");
        }
        else {
          console.log("contrôle password OK")

          const token = createToken(user._id)
          console.log("création du token =>", token)
          console.log('vous êtes connecté')

          res.cookie('jwt', token, {
            httpOnly: false,
            maxAge: maxAge * 1000,
            SameSite: true,
            secure: false
          });

          res.json({
            success: true,
            message: "user logged",
            user: {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              jwt: token
            }
          })
        }
      })
    } catch(err) {
      console.log(err);
      res.send(err);
    }
  },


  // Create
  create: async (req, res, next) => {
    try {
      // await userSchema.validateAsync(req.body);
      
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create(req.body);

      const token = createToken(newUser._id)
      console.log("création du token =>", token)
      console.log('user inscrit')

      res.cookie('jwt', token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        SameSite: true,
        secure: false
      });

      res.json({
        success: true,
        message: "user logged",
        user: {
          _id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          jwt: token
        }
      })
    }
    catch (error) {
      console.log(error)
      console.log(error.details[0].message);
      res.status(500).json(error.details[0].message);
    }
  },

  findAll: async (req, res, next) => {
    const users = await User.find();
    res.json(users);
  },

  findOne: async (req, res, next) => {
    const user = await User.find({_id: req.params.id});
    res.json(user);
  },

  update: async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) res.json('utilisateur pas trouvée')

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    await User.updateOne(req.body);

    res.json({
      status: "success",
      data: await User.findById(req.params.id)
    })
  },


  logout: async (req, res, next) => {
    try {
      console.log("JE PASSE DANS LOGOUT")
      res.cookie('jwt', '', { maxAge: 1 });
      res.locals.user = '';
      res.json(true)
    } catch(err) {
      console.log(err)
    }
  }

}