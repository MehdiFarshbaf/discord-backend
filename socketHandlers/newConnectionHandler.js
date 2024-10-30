import {addNewConnectedUser} from './../serverStore.js';
import {updateFriendPendingInvitations, updateFriends} from "./update/friends.js";


// هر وقت کاربری وصل بشه این فراخوانی میشه
export const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user
    addNewConnectedUser({socketId: socket.id, userId: userDetails.userId})
    await updateFriendPendingInvitations(userDetails.userId)
    await updateFriends(userDetails.userId)
}