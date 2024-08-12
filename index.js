import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
// middlewares

// routes

// load config
dotenv.config()

const app = new express()

// BodyParser & headers
// app.use(cors({credentials: true, origin: 'http://localhost:3003'}))
app.use(cors({credentials: true, origin: '*'}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(express.json())

//static folder
app.use(express.static("public"))

// connect to database
// connectDB()

// Routes
// app.use("/api/user", userRoutes)

// error handler
// app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))