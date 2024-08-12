import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        // const conn = await mongoose.connect(process.env.NODE_ENV == "development" ? "mongodb://127.0.0.1:27017/shop" : "mongodb://farshbaf_shop:Mehdi14439@localhost:27017/farshbaf_shop", {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/discord", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}