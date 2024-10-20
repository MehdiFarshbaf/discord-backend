import {sendErrorResponse} from "../helpers/responses.js";
import User from "../models/User.js";

export const postInvitation = async (req, res, next) => {

    const {targetEmailAddress} = req.body
    const {userId, email} = req.user
    try {
        if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
            sendErrorResponse("Sorry, you cannot become friend with yourself", 409)
        }

        const targetUser = await User.findOne({email: targetEmailAddress.toLowerCase()})

        if (!targetUser) sendErrorResponse(`Friend of ${targetEmailAddress} has not been found. Please check mail address`, 404)

        res.status(200).json({
            success: true,
            message: 'invite shod',
            email: targetEmailAddress
        })
    } catch (err) {
        next(err)
    }
}