import { removeConnectedUser } from "../serverStore.js"

export const disconnectHandler = async (socket) => {
    removeConnectedUser(socket.id)
}