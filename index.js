import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import {connectDB} from "./config/connectDB.js";

// middlewares
import {errorHandler} from "./middlewares/error.js";
import {headers} from "./middlewares/headers.js";

// routes
import authRoutes from "./routes/authRoutes.js";

// load config
dotenv.config()

const app = new express()

// BodyParser & headers
app.use(cors({credentials: true, origin: '*'}))
// app.use(cors({credentials: true, origin: 'http://localhost:3003'}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(express.json())
app.use(headers)
//static folder
app.use(express.static("public"))

// connect to database
connectDB()

// Routes
app.use("/api/auth", authRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))