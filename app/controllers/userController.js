const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'the secret sentence', {
    expiresIn: maxAge,
  });
}

module.exports = {

  login: async (req, res) => {
    try {

      console.log(req.body);

      const isEmail = validator.isEmail(req.body.email);
      if (!isEmail) return res.status(500).send("email non valide");

      const data = await User.findAll({ where: { email : req.body.email }});
   
      if (!data.length) return res.status(500).send("Email ou mot de passe incorrect")
      
      // console.log(data[0].dataValues)

      const user = data[0].dataValues;

      const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

      // console.log("pass match => ", passwordMatch)

      if (!passwordMatch) 
        return res.status(500).send("Email ou mot de passe incorrect");

      const token = createToken(user.id);
      console.log("création du token =>", token);

      res.cookie('jwt', token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        SameSite: false,
      });
    
      res.json({
        success: true,
        message: "user logged",
        user: {
          id: user.id,
          email: user.email,
          jwt: token
        }
      });

    } catch(err) {
      console.log(err);
      res.send(err);
    }
  },


  create: async (req, res, next) => {
    try {
      // await userSchema.validateAsync(req.body);

      const isEmail = validator.isEmail(req.body.email);
      if (!isEmail) return res.status(500).send("email incorrect")

      const isMinPasswordLength = validator.isByteLength(req.body.password, { min: 8, max: 25 })
      if (!isMinPasswordLength) return res.status(500).send("le nombre de caractère doit être de 8 au minimum")

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create(req.body);

      const token = createToken(newUser.id)
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
          id: newUser.id,
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

  findAll: async (req, res) => {
    const users = await User.findAll();
    res.send(users);
  },

  findOne: async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.send('user inconnu')
    res.send(user);
  },

  update: async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id);

      if (!data) return res.status(500).send("user inconnu")
    
      const user = data.dataValues;

      req.body.password = bcrypt.hashSync(req.body.password, 10);
  
      await User.update(req.body, {
        where: { id: user.id }
      });
  
      return res.send({
        status: "success",
        data: await User.findByPk(req.params.id)
      })

    } catch(err) {
      console.log(err);
      return res.status(500).send(err)
    }
  },


  logout: (req, res, next) => {
    try {
      console.log("JE PASSE DANS LOGOUT")
      res.cookie('jwt', '', { maxAge: 1 });
      res.locals.user = '';
      return res.send(true)
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

}