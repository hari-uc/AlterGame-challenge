const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtsecret');




exports.verifyToken = async (req, res, next) => {
        const token = req.headers['authorization'];
        if(typeof token !== 'undefined'){
                const bearer = token.split(' ');
                const bearerToken = bearer[1];
                req.token = bearerToken;
        }
        


        jwt.verify(token, jwtSecret.secret, (err, decoded) => {
                if (err) {
                        return res.status(401).json({
                                message: 'Unauthorized'
                        });
                }
                req.userId = decoded.id;
                next();
        }
        );
}

    




