const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// No authorization required, used for identification only

module.exports = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.jwt = jwt.verify(token, secret);
        next();
    } catch(error) {
        req.jwt = {};
        next();
    }
}