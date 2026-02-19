import express from "express"


const app = express()

//Routes

import { userRouter } from "./routes/user.route.js"

app.post('/api/v1/users', userRouter)

export default app