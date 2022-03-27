const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');

// const requireAuth = (req, res, next) => {

//     const token = req.cookies.jwt;
//     console.log("je suis dans le requireAuth")

//     // If token doesn't exists
//     if (!token) {
//         res.status(500).json("token does not exists");
//     }
//     else {
//         jwt.verify(token, 'the secret sentence', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 // res.status(500).json("token inconnu")
//                 next()
//             }
//             else {
//                 console.log(decodedToken);
//                 // res.status(200).json("token décodé")
//             }
//         });
//     }
// }


const checkUser = (req, res, next) => {

    console.log(req.headers)

    if (!req.headers.authorization) {
        console.log("No authenticated");
        res.locals.userId = "";
        return next();
    }

    const token = req.headers.authorization.split(' ')[1];
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
    });

}

module.exports = { checkUser };