import dotenv from 'dotenv'
import app from './app.js'
import { connectDb } from './database/database.js'
dotenv.config({path: './.env'})

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
        console.log(`Server started successfully on port ${process.env.PORT}`)
    })
    })
    .catch((error) => {
        console.log("Mongo db connection failed: ", error);
    })