import { Server } from 'socket.io';
import { verifyTokenSocket } from "./middlewares/authSocket.js";
import { newConnectionHandler } from './socketHandlers/newConnectionHandler.js';
import { disconnectHandler } from './socketHandlers/disconnectHandler.js';
import { getOnlineUsers, setSocketServerInstance } from "./serverStore.js";
import { directMessageHandler } from './socketHandlers/directMessageHandler.js';
import {directChatHistoryHandler} from "./socketHandlers/directChatHistoryHandler.js";


export const registerSocketServer = (server) => {

    const socketIo = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    setSocketServerInstance(socketIo)

    socketIo.use(verifyTokenSocket)


    const emitOnlineUsers = () => {
        const onlineUsers = getOnlineUsers()
        socketIo.emit("online-users", { onlineUsers })
    }

    socketIo.on("connection", (socket) => {
        // console.log('user connected')
        // console.log(socket.id)

        newConnectionHandler(socket)

        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data)
        })

        socket.on("direct-chat-history",data=>{
            directChatHistoryHandler(socket,data)
        })

        socket.on('disconnect', () => {
            disconnectHandler(socket)
        })
        emitOnlineUsers()

    })

    setInterval(() => {
        emitOnlineUsers()
    }, [1000 * 8])
}