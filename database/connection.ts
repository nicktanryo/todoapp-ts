import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"

async function connectDatabase(): Promise<void> {
    const option: {} = {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }

    const url: string = process.env.MONGO_DB as string

    try {
        let connectedToDatabase = await mongoose.connect(url, option)
        if (connectedToDatabase) console.log("Connected to database")
    } catch (err) {
        console.log("Failed to connect to database");
        console.log(`ERR: ${err}`)
    }
}
export default connectDatabase