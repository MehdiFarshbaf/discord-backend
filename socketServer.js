import { Server } from 'socket.io';
import { verifyTokenSocket } from "./middlewares/authSocket.js";
import { newConnectionHandler } from './socketHandlers/newConnectionHandler.js';
import { disconnectHandler } from './socketHandlers/disconnectHandler.js';
import {setSocketServerInstance} from "./serverStore.js";


export const registerSocketServer = (server) => {

    const socketIo = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    setSocketServerInstance(socketIo)

    socketIo.use(verifyTokenSocket)

    socketIo.on("connection", (socket) => {
        // console.log('user connected')
        // console.log(socket.id)

        newConnectionHandler(socket)
        socket.on('disconnect', () => {
            disconnectHandler(socket)
        })
    })
}