import mongoose, { Schema } from "mongoose"
import { IUserSchema } from "../interfaces/interfaces"

const userSchema = new mongoose.Schema<IUserSchema>({
    username: String,
    fName: String,
    lName: String,
    email: String,
    password: String,
    todolist: [{ type: Schema.Types.ObjectId, ref: 'TodoItem' }]
})

const User: mongoose.Model<IUserSchema> = mongoose.model<IUserSchema>("User", userSchema)

export default User