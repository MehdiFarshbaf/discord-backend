import FriendInvitation from "../../models/FriendInvitation.js";
import {getActiveConnections, getSocketServerInstance} from "../../serverStore.js";
import User from "../../models/User.js";


export const updateFriendPendingInvitations = async (userId) => {
    try {
        const pendingInvitations = await FriendInvitation.find({receiverId: userId}).populate("senderUser", "_id username email")

        // find if user of specified userId has active connection
        // فقط از طریق سوکت ای دی میتوان ایمیت کرد
        const receiverList = getActiveConnections(userId)
        const io = getSocketServerInstance()

        receiverList.forEach(receiverSocketId => {
            io.to(receiverSocketId).emit("friend-invitations", {
                pendingInvitations: pendingInvitations ? pendingInvitations : []
            })
        })

    } catch (err) {
        console.log("updateFriendPendingInvitation => ", err)
    }
}

export const updateFriends = async (userId) => {
    try {
        // find active connection of specific id (online user) تمام سوکت های انلاین طرف رو میده
        const receiverList = getActiveConnections(userId)

        if(receiverList.length > 0){
            const user = await User.findById(userId, {_id:1, friends:1}).populate("friends", "_id username email")
            if (user) {
                const friendsList = user.friends.map(friend => {
                    return {
                        id: friend._id,
                        username: friend.username,
                        email: friend.email
                    }
                })
                // get io server instance
                const io = getSocketServerInstance()
                receiverList.forEach((receiverSocketId)=>{
                    io.to(receiverSocketId).emit("friends-list",{
                        friends:friendsList ? friendsList : []
                    })
                })
            }

        }

    } catch (err) {
        console.log("update friends ",err)
    }
}