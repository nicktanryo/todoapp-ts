import React, { useContext, useState } from 'react'
import { TextField, Button, makeStyles, Grid } from "@material-ui/core"

import DatePicker from "./DatePicker"

import { TodoListContext, CTodoListContext } from "./Content"
import todolist from "../../../services/todolist"
import { themeContext, CThemeContext } from "../Home"

const useStyles = makeStyles((theme) => ({
    inline: {
        width: "100%"
    },
    button: {
        height: "100%"
    },
    item: {
        display: "inline",
        margin: theme.spacing(1)
    }
}))

let now: Date = new Date()

export default function AddTodoForm(): JSX.Element {
    const classes = useStyles()
    const TodoList = useContext<CTodoListContext | undefined>(TodoListContext)
    const Theme = useContext<CThemeContext | undefined>(themeContext)

    const [todoItem, setTodoItem] = useState<String>("")
    const [deadline, setDeadline] = useState<Date | null>(
        new Date(`${now.getFullYear()}-${now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)}-${now.getDate() > 9 ? now.getDate() : "0" + now.getDate()}T23:59:00`)
    )

    async function onSubmit(event: any): Promise<any> {
        event.preventDefault()

        const { data } = await todolist.put({ todoItem, deadline })
        TodoList?.setTodolist(data)
        setTodoItem("")
        now = new Date()
        setDeadline(new Date(`${now.getFullYear()}-${now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)}-${now.getDate() > 9 ? now.getDate() : "0" + now.getDate()}T23:59:00`))
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container direction="column" justify="space-between" className={classes.inline}>
                <Grid item className={classes.item}>
                    <TextField required
                        label="New Todo"
                        name="new-todo"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setTodoItem(event.target.value)}
                        value={todoItem}
                        color={Theme?.darkTheme ? "secondary" : "primary"}
                        autoComplete="off"
                        fullWidth
                    />
                </Grid>
                <Grid item className={classes.item}>
                    <DatePicker deadline={deadline} setDeadline={setDeadline} />
                </Grid>
                <Grid item className={classes.item}>
                    <Button
                        className={classes.button}
                        type="submit"
                        color={Theme?.darkTheme ? "secondary" : "primary"}
                        variant="contained"
                        onClick={onSubmit}
                        disabled={todoItem === "" || !dateIsValid(deadline as Date)}
                        fullWidth
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

function dateIsValid(deadline: Date): boolean {
    return !isNaN(deadline?.getTime() as number)
}
