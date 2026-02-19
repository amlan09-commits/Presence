import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.route('/register', registerUser)

userRouter.route('/login', loginUser)

export { userRouter }