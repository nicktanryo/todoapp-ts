import axios from "axios"
import URL from "./url"

import { IUserLogin, IResponse } from "../interfaces/interfaces"
import { ResponseDefaultValue } from "./response"

const url = URL + "/login"

interface login {
    get: () => Promise<IResponse>
    post: (userInput: IUserLogin) => Promise<IResponse>
}

async function get(): Promise<IResponse> {
    try {
        let { data } = await axios.get(url, { withCredentials: true })
        return data
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

async function post(userInput: IUserLogin): Promise<IResponse> {
    try {
        const { data } = await axios.post(url, userInput, { withCredentials: true })
        return data
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

const login: login = {
    "get": get,
    "post": post
}

export default login