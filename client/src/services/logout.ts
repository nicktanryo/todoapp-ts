import axios from "axios"
import URL from "./url"

import { IResponse } from "../interfaces/interfaces"
import { ResponseDefaultValue } from "./response"

const url = URL + "/logout"

interface logout {
    post: () => Promise<IResponse>
}

async function post(): Promise<IResponse> {
    try {
        const { data } = await axios.post(url, {}, { withCredentials: true })
        return data
    } catch (err) {
        console.log(err)
        return { ...ResponseDefaultValue, err }
    }
}

const logout = {
    post: post
}

export default logout