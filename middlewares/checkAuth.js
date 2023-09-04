import jwt from "jsonwebtoken"
import Users from "../models/user.schema.js"
const checkAuth = async (req, res, next) => {
    let token
    if (

        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")

    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.users = await Users.findbyId(decoded.id)

            return next();

        } catch (error) {
            return res.status(404).json({ msg: "Error" })
        }
    }

if (!token) {
    const error = new Error ('Token not valid')
    res.status(401).json({
        msg: error.message
    })
}

}

export default checkAuth;