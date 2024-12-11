import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"
import { updateChatHistory } from "./update/chat.js"

export const directMessageHandler = async (socket, data) => {
    try {
        console.log("direct message event is being handle")
        const { userId } = socket.user
        const { receiverUserId, content } = data
        // create new message
        const message = await Message.create({
            content,
            author: userId,
            date: new Date(),
            type: "DIRECT"
        })
        // find if conversation exist with this tow users - if not create new

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverUserId] }
        })

        if (conversation) {

            conversation.messages.push(message._id)
            await conversation.save()

            // perform and update to sender and receiver if is online
            updateChatHistory(conversation._id.toString())
        } else {
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId]
            })
            // perform and update to sender and receiver if is online
            updateChatHistory(newConversation._id.toString())

        }



    } catch (error) {
        console.log(error)
    }
}