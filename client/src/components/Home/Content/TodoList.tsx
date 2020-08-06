import React, { ReactElement, useContext, useState } from 'react'
import { Grid, makeStyles, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete"

import Popup from "./Popup"

import { TodoItem } from "../../../interfaces/interfaces"
import todolistService from "../../../services/todolist"
import { TodoListContext, CTodoListContext } from "./Content"
import { themeContext, CThemeContext } from "../Home"

const useStyles = makeStyles((theme) => ({
    lineThrough: {
        textDecoration: "line-through"
    }
}))

interface Props {
    todolist: Array<TodoItem>
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export default function TodoList({ todolist }: Props): ReactElement {
    const classes = useStyles()

    const [popupOpen, setPopupOpen] = useState<boolean>(false)
    const [popupData, setPopupData] = useState<TodoItem | null>(null)

    const TodoList = useContext<CTodoListContext | undefined>(TodoListContext)
    const Theme = useContext<CThemeContext | undefined>(themeContext)

    function handlePopup(data: TodoItem): void {
        setPopupOpen(true)
        setPopupData(data)
    }

    async function handleFlag(id: string): Promise<any> {
        TodoList?.setTodolist((prevTodoList) => prevTodoList.map(todoitem => todoitem._id === id ?
            { ...todoitem, flag: !todoitem.flag, completedAt: todoitem.flag ? new Date(0) : new Date() } :
            todoitem))
        await todolistService.flag({ todoItemId: id })
    }

    async function deleteTodoItem(id: string): Promise<any> {
        TodoList?.setTodolist((prevTodoList) => prevTodoList.filter(todoitem => todoitem._id !== id))
        await todolistService.delete({ todoItemId: id })
    }

    return (
        <div>
            <Grid container direction="column">
                <List dense={false}>
                    {
                        todolist.map((todoitem) => {
                            return (
                                <ListItem key={todoitem._id}>
                                    <Checkbox
                                        edge="start"
                                        checked={todoitem.flag}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={() => handleFlag(todoitem._id)}
                                        color={Theme?.darkTheme ? "secondary" : "primary"}
                                    />
                                    <ListItemText
                                        style={{ cursor: "pointer" }}
                                        className={todoitem.flag ? classes.lineThrough : ""}
                                        primary={Capitalized(todoitem.name)}
                                        secondary={todoitem.completedAt.getTime() === new Date(0).getTime() && (`Deadline: ${days[todoitem.deadline.getDay()]}, ${todoitem.deadline.getDate()} ${months[todoitem.deadline.getMonth()]} ${todoitem.deadline.getFullYear()}`)}
                                        onClick={() => handlePopup(todoitem)}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodoItem(todoitem._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Grid>
            {popupOpen && <Popup open={popupOpen} setOpen={setPopupOpen}
                data={popupData} setData={setPopupData}
                handleFlag={handleFlag} deleteTodoItem={deleteTodoItem} />}
        </div>
    )
}

function Capitalized(str: String): String {
    const tempStr = str.toLowerCase().split(" ")
    return tempStr.map(str => str && (str[0].toUpperCase() + str.slice(1))).join(" ")
}
