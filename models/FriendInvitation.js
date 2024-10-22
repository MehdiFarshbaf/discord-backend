import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
invitationSchema.virtual('senderUser', {
    ref: 'User',
    localField: 'senderId',
    foreignField: '_id',
    justOne: true, // default is false
})
export default mongoose.model("FriendInvitation", invitationSchema)