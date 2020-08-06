import { Router } from "express"

import login from "./login"
import register from "./register"
import logout from "./logout"
import todolist from "./todolist"

const route = Router()

route.use("/login", login)
route.use("/register", register)
route.use("/logout", logout)
route.use("/todolist", todolist)

export default route