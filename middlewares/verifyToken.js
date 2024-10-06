import jwt from "jsonwebtoken";

// helpers
import {sendErrorResponse} from "../helpers/responses.js";


export const verifyToken = async (req, res, next) => {

    // const authHeader = req.headers["authorization"]
    // const token = authHeader && authHeader.split(" ")[1]

    let token = req.body.token || req.query.token || req.headers["authorization"]

    try {
        if (token == null) sendErrorResponse("token is required for authentication", 401)

        token = token.replace(/Bearer\s+/, "")

        jwt.verify(token, process.env.JWT_SECRET_USER, (err, decode) => {
            if (err) sendErrorResponse("Invalid Token", 403)
            req.userId = decode.userId
            req.user = decode
            next()
        })
    } catch (err) {
        next(err)
    }
}