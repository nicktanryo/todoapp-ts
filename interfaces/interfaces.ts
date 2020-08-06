import { Document } from "mongoose"

export interface IResponse {
    err: String | null
    data: {} | null
    isAuthenticated: boolean
}

export interface ITodoItemSchema extends Document {
    name: String,
    flag: Boolean,
    createdAt: Date,
    completedAt: Date,
    deadline: Date
}

export interface IUserSchema extends Document {
    username: String,
    fName: String,
    lName: String,
    email: String,
    password: String,
    todolist: ITodoItemSchema[]
}