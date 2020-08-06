import { Router } from "express"

import User from "../models/User"
import TodoItem from "../models/TodoItem"
import { IUserSchema, ITodoItemSchema } from "../interfaces/interfaces"
import { userAuthenticated } from "../authentication/authentication"


const router = Router()

router.route("/")
    .get(userAuthenticated, async (req: Express.Request, res: Express.Response) => {
        const username: String = (req as any).user.username

        const user: IUserSchema | null = await User.findOne({ username }).populate("todolist");
        (res as any).status(200).send({
            isAuthenticated: req.isAuthenticated(),
            data: user?.todolist,
            err: null
        })
    })
    .put(userAuthenticated, async (req: Express.Request, res: Express.Response) => {
        try {
            const username: String = (req as any).user.username
            const userFound: IUserSchema | null = await User.findOne({ username })

            const todoItem = new TodoItem({
                name: (req as any).body.todoItem,
                flag: false,
                createdAt: new Date(),
                completedAt: new Date(0),
                deadline: new Date((req as any).body.deadline)
            })
            const savedTodo: ITodoItemSchema | null = await todoItem.save()
            userFound?.todolist.push(savedTodo)

            await userFound?.save()

            const user: IUserSchema | null = await User.findOne({ username }).populate("todolist");

            (res as any).status(200).send({
                isAuthenticated: req.isAuthenticated(),
                data: user?.todolist,
                error: null
            })
        } catch (err) {
            console.log(err);
            (res as any).status(500).send({
                isAuthenticated: false,
                data: null,
                error: "SERVER ERROR"
            })
        }
    })
    .delete(userAuthenticated, async (req: Express.Request, res: Express.Response) => {
        try {
            const username = (req as any).user.username
            const todoItemId = (req as any).body.todoItemId

            await TodoItem.findByIdAndRemove(todoItemId)

            let user: IUserSchema | null = await User.findOne({ username });
            (user?.todolist as any).pull(todoItemId);
            await user?.save();

            const updatedUser = await User.findOne({ username }).populate("todolist");

            (res as any).status(200).send({
                isAuthenticated: req.isAuthenticated(),
                data: updatedUser?.todolist,
                error: null
            })

        } catch (err) {
            console.log(err);
            (res as any).status(500).send({
                isAuthenticated: false,
                data: null,
                error: "SERVER ERROR"
            })
        }
    })

router.route("/flag")
    .post(userAuthenticated, async (req: Express.Request, res: Express.Response) => {
        try {
            const username = (req as any).user.username
            const todoItemId = (req as any).body.todoItemId

            const targetedTodo: ITodoItemSchema | null = await TodoItem.findById(todoItemId)
            await TodoItem.findByIdAndUpdate(todoItemId, { flag: !targetedTodo?.flag, completedAt: targetedTodo?.flag ? new Date(0) : new Date() })

            const updatedUser: IUserSchema | null = await User.findOne({ username }).populate("todolist");

            (res as any).status(200).send({
                isAuthenticated: req.isAuthenticated(),
                data: updatedUser?.todolist,
                error: null
            })
        } catch (err) {
            console.log(err);
            (res as any).status(500).send({
                isAuthenticated: false,
                data: null,
                error: "SERVER ERROR"
            })
        }
    })

export default router