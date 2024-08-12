import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: [true, "ایمیل نباید تکراری باشد."],
        required: [true, "ایمیل الزامی است."]
    },
    password: {
        type: String,
        default: "",
        required: [true, "کلمه عبور الزامی است."]
    },
    username: {
        type: String,
        default: "",
        required: [true, "کلمه کاربری الزامی است."]
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

export default mongoose.model("User", userSchema)