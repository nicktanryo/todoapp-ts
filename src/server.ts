import dotenv from "dotenv"
dotenv.config()

import path from "path"

// setup express
import express from "express"
import bodyParser from "body-parser"

// require cors
import cors from "cors"

// setup auth
import session from "express-session"
import passport, { PassportStatic } from "passport"
import initialize from "../passport-config/passport-config"
initialize(passport)

// import routes
import apiRoute from "../routes/routes"

// import database connection
import connectDatabase from "../database/connection"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

// allow access control
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if ('OPTIONS' == req.method) res.sendStatus(200)
    else next();
})

// use session
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use("/api", apiRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req: Express.Request, res: Express.Response) => {
        (res as any).sendFile(path.join(__dirname, "../", 'client', 'build', 'index.html')); // relative path
    })
}

const PORT: number | string = process.env.PORT || 5000
app.listen(PORT as number, () => {
    console.log(`Listening PORT: ${PORT}... `)
    connectDatabase()
})