import jwt from "jsonwebtoken";

// models
import User from "../models/User.js";

// helpers
import { sendErrorResponse } from "../helpers/responses.js";
import { comparePassword, hashed } from "../helpers/functions.js";

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // check user exists
        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) return sendErrorResponse("invalid credentials, please try again", 404)

        // check user password
        const match = await comparePassword(password, user.password)
        if (!match) sendErrorResponse("invalid credentials, please try again", 401)

        // create jwt token
        const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_USER, {
            expiresIn: "7d"
        })


        res.json({
            success: true,
            message: "login",
            token,
            user: {
                username: user.username,
                email, 
                token
            }
        })
    } catch (err) {
        next(err)
    }
}
export const userRegister = async (req, res, next) => {
    try {
        const { email, username, password } = req.body

        // check user exists
        const userExists = await User.exists({ email: email.toLowerCase() })

        if (userExists) sendErrorResponse("email already is use.", 422)

        const hashedPassword = await hashed(password)
        const user = await User.create({ email: email.toLowerCase(), username, password: hashedPassword })

        // create jwt token
        const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_USER, {
            expiresIn: "7d"
        })

        res.json({
            success: true,
            message: "register",
            user: {
                token,
                email,
                username
            }
        })
    } catch (err) {
        next(err)
    }
}