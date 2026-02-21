import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.DB_URI}`)
        console.log("MongoDB connected: ",dbConnection.connection.host)
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

export {connectDb}