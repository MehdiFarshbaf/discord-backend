import {sendErrorResponse} from "../helpers/responses.js";
import User from "../models/User.js";
import FriendInvitation from "../models/FriendInvitation.js";

export const postInvitation = async (req, res, next) => {

    const {targetEmailAddress} = req.body
    const {userId, email} = req.user
    console.log("email",email)
    try {
        if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
            sendErrorResponse("Sorry, you cannot become friend with yourself", 409)
        }

        const targetUser = await User.findOne({email: targetEmailAddress.toLowerCase()})

        if (!targetUser) sendErrorResponse(`Friend of ${targetEmailAddress} has not been found. Please check mail address`, 404)

        // check if invitation has been already send!
        const invitationAlready = await FriendInvitation.findOne({senderId: userId, receiverId: targetUser._id})
        if (invitationAlready) sendErrorResponse("Invitation has been already send.", 409)

        // check if the user which we would like to invite is already our friend
        const userAlreadyFriends = targetUser.friends.find(friendId => friendId.toString() === userId.toString())
        if (userAlreadyFriends) sendErrorResponse("Friend already added, Please check friend list", 409)

        // create new invitation in database

        await FriendInvitation.create({senderId: userId, receiverId: targetUser._id})

        res.status(200).json({
            success: true,
            message: 'Invitation has been send.',
            email: targetEmailAddress
        })
    } catch (err) {
        next(err)
    }
}