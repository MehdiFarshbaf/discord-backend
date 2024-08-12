import User from "../models/User.js";
import user from "../models/User.js";
import {sendErrorResponse} from "../helpers/responses.js";
import {hashed} from "../helpers/functions.js";

export const userLogin = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "login"
        })
    } catch (err) {
        next(err)
    }
}
export const userRegister = async (req, res, next) => {
    try {
        const {email, username, password} = req.body

        // check user exists
        const userExists = await User.exists({email: email.toLowerCase()})

        if (userExists) sendErrorResponse("email already is use.", 422)

        const hashedPassword = await hashed(password)
        const user = await User.create({email: email.toLowerCase(), username, password: hashedPassword})

        const token = "jwt"

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