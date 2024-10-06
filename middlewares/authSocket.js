import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../helpers/responses.js";


export const verifyTokenSocket = (socket, next) => {
    const token = socket.handshake.auth?.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        socket.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        console.log("err")
       next(err)
    }

};


