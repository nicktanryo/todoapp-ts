import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, Grid, Paper } from "@material-ui/core"

import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

import todolistService from "../../../services/todolist"

export interface CTodoListContext {
    todolist: Array<any>
    setTodolist: React.Dispatch<React.SetStateAction<any[]>>
}

export const TodoListContext = React.createContext<CTodoListContext | undefined>(undefined)

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: theme.spacing(8),
        width: "100%",
        height: "100vh"
    },
    content: {
        maxWidth: "500px"
    },
    paper: {
        padding: theme.spacing(3)
    }
}))

export default function Content(): JSX.Element {
    const classes = useStyles()

    const [todolist, setTodolist] = useState<Array<any>>([])

    useEffect(() => {
        async function getdata() {
            const { isAuthenticated, data } = await todolistService.get()
            if (isAuthenticated) setTodolist(data)
        }
        getdata()
        return function cleanup() {
            setTodolist([])
        }
    }, [])

    return (
        <TodoListContext.Provider value={{ todolist, setTodolist }}>
            <Paper>
                <div className={classes.container}>
                    <Grid container direction="column" justify="center" className={classes.content}>
                        <Paper className={classes.paper} elevation={8}>
                            <TodoList todolist={todolist} />
                            <Paper className={classes.paper} elevation={6}>
                                <AddTodoForm />
                            </Paper>
                        </Paper>
                    </Grid>
                </div>
            </Paper>
        </TodoListContext.Provider>
    )
}
