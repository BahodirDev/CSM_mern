const jwt = require('jsonwebtoken');
const User = require('../modals/auth.js')
const mustSignIn = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        let decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json(error)
    }

}

const isAdmin = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if (user.role !== 1) {
            res.status(401).send('unauthorized')
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json(error)
    }

}

module.exports  = {isAdmin,mustSignIn}