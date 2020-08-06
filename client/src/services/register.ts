import axios from "axios"
import URL from "./url"

import { IUserRegister, IResponse } from "../interfaces/interfaces"
import { ResponseDefaultValue } from "./response"

const url = URL + "/register"

interface register {
    post: (userInput: IUserRegister) => Promise<IResponse>
}

async function post(userInput: IUserRegister): Promise<IResponse> {
    try {
        const { data } = await axios.post(url, userInput, { withCredentials: true })
        return data
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

const register: register = {
    "post": post
}

export default register