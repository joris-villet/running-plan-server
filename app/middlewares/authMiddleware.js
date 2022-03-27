const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');

// middleware auth jwt
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    console.log("je suis dans le requireAuth")

    // If token doesn't exists
    if (!token) {
        res.status(500).json("token does not exists");
    }
    else {
        jwt.verify(token, 'the secret sentence', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.status(500).json("token inconnu")
                next()
            }
            else {
                console.log(decodedToken);
                // res.status(200).json("token décodé")
            }
        });
    }
}

// Check current user
const checkUser = (req, res, next) => {
    console.log("token actuel ", req.headers)

    let token = req.body.jwt;
    if (token) {

        jwt.verify(token, 'the secret sentence', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log('token décodé => ', decodedToken);
                const [user] = await User.find({_id: decodedToken.id});
                res.json(user)
            }
        });
    }
    else {
        console.log('no token')
        //res.status(500).send(false)
        res.redirect('/login')
    }
}

module.exports = { requireAuth, checkUser };