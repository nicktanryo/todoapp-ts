import axios from "axios"
import URL from "./url"

import { IResponse, IUserPutTodo, IUserDeleteTodo, IUserFlag } from "../interfaces/interfaces"
import { ResponseDefaultValue } from "./response"

const url = URL + "/todolist"

function processDate(todolist: Array<any>): Array<any> {
    return todolist.map((todoitem: { createdAt: string, completedAt: string, deadline: string }) => {
        return {
            ...todoitem,
            createdAt: new Date(todoitem.createdAt),
            completedAt: new Date(todoitem.completedAt),
            deadline: new Date(todoitem.deadline)
        }
    })
}

interface todolist {
    get: () => Promise<IResponse>
    put: (userInput: IUserPutTodo) => Promise<IResponse>
    delete: (userInput: IUserDeleteTodo) => Promise<IResponse>
    flag: (userInput: IUserFlag) => Promise<IResponse>
}

async function get(): Promise<IResponse> {
    try {
        let { data } = await axios.get(url, { withCredentials: true })
        return {
            ...data,
            data: processDate(data.data)
        }
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

async function put(userInput: IUserPutTodo): Promise<IResponse> {
    try {
        const { data } = await axios({ url, method: "PUT", data: userInput, withCredentials: true })
        return {
            ...data,
            data: processDate(data.data)
        }
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

async function deleteTodo(userInput: IUserDeleteTodo): Promise<IResponse> {
    try {
        const { data } = await axios({ url, method: "DELETE", data: userInput, withCredentials: true })
        return {
            ...data,
            data: processDate(data.data)
        }
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

async function flag(userInput: IUserFlag): Promise<IResponse> {
    try {
        const { data } = await axios({ url: `${url}/flag`, method: "POST", data: userInput, withCredentials: true })
        return {
            ...data,
            data: processDate(data.data)
        }
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

const todolist: todolist = {
    "get": get,
    "put": put,
    "delete": deleteTodo,
    "flag": flag
}

export default todolist