import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    reviverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

export default mongoose.model("FriendInvitation", invitationSchema)