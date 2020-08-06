export interface IUserLogin {
    username: String,
    password: String
}

export interface IUserRegister {
    email: String
    username: String
    password: String
    confirmPassword: String
    fName: String
    lName: String
}

export interface IUserPutTodo {
    todoItem: String
    deadline: Date | null
}

export interface IUserDeleteTodo {
    todoItemId: String
}

export interface IUserFlag {
    todoItemId: String
}

export interface IResponse {
    err: String | null
    data: any
    isAuthenticated: boolean
}

export interface TodoItem {
    _id: string,
    name: string,
    flag: boolean,
    createdAt: Date,
    completedAt: Date,
    deadline: Date
}