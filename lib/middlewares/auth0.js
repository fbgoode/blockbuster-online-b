const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// No authorization required, used for identification only

module.exports = async (req,res,next)=>{
    try {
        req.jwt = jwt.verify(req.headers.authorization, secret);
        next();
    } catch(error) {
        req.jwt = {};
        next();
    }
}