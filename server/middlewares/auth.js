import jwt from 'jsonwebtoken';
import User from '../modals/auth.js'
export const mustSignIn = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        let decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json(error)
    }

}

export const isAdmin = async(req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if(user.role !== 1){
            res.status(401).send('unauthorized')
        }else{
            next()
        }
    } catch (error) {
        res.status(401).json(error)
    }

}