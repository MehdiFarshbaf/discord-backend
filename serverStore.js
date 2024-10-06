const connectedUsers = new Map()

export const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId })
    console.log("list : ", connectedUsers)
}

export const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId)
        console.log("remove from list")
        console.log("list after delete : ", connectedUsers)
    }
}