const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Requires level 5 admin authorization

module.exports = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.jwt = jwt.verify(token, secret);
        if(req.jwt.role != 'Admin') throw new Error();
        next();
    } catch(error) {
        res.status(401).json({
            message: 'Level 5 authorization required.'
        });
    }
}