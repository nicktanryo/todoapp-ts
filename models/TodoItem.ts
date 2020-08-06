import mongoose, { Document } from "mongoose"
import { ITodoItemSchema } from "../interfaces/interfaces"

const todoItemSchema = new mongoose.Schema<ITodoItemSchema>({
    name: String,
    flag: Boolean,
    createdAt: Date,
    completedAt: Date,
    deadline: Date
})

const TodoItem: mongoose.Model<ITodoItemSchema> = mongoose.model<ITodoItemSchema>("TodoItem", todoItemSchema)

export default TodoItem