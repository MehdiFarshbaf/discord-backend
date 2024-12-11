import mongoose from "mongoose";

const messageShema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    date: Date,
    type: String
})

export default mongoose.model("Message", messageShema)