import FriendInvitation from "../../models/FriendInvitation.js";
import {getActiveConnections, getSocketServerInstance} from "../../serverStore.js";


export const updateFriendPendingInvitations = async (userId) => {
    try {
        const pendingInvitations = await FriendInvitation.find({receiverId: userId}).populate("senderUser", "_id username email")

        // find if user of specified userId has active connection
        // فقط از طریق سوکت ای دی میتوان ایمیت کرد
        const receiverList = getActiveConnections(userId)
        console.log("list : ",receiverList)
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