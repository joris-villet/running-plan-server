const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');

const requireAuth = (req, res, next) => {
    let token = null;
    // console.log(req.cookies)

    //If token doesn't exists
    if (!req.cookies.jwt) 
        return res.status(500).json("token does not exists");
    else {
        token = req.cookies.jwt;
        jwt.verify(token, 'the secret sentence', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.status(500).json("token inconnu")
                next()
            }
            else {
                console.log("token décodé => ", decodedToken);
                res.locals.userId = decodedToken.id;
                res.status(200)
                    .json({
                        success: true,
                        message: "token décodé"
                    })
                next()
            }
        });
    }

}


const checkUser = (req, res, next) => {


    if (!req.cookies.jwt) {
        console.log("No authenticated");
        res.locals.userId = "";
        return next();
    }

    const token = req.cookies.jwt;
    console.log(token)

    jwt.verify(token, 'the secret sentence', async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Token false")
        }
        else {
            console.log('token décodé => ', decodedToken);
            const user = await User.findByPk(decodedToken.id);
            res.locals.userId = user.dataValues.id;
            return next()
        }
    })

}

module.exports = { requireAuth, checkUser };