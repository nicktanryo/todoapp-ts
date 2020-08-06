import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { TodoItem } from '../../../interfaces/interfaces';
import { Box, makeStyles, Typography } from '@material-ui/core';

import { themeContext, CThemeContext } from "../Home"

const useStyles = makeStyles((theme) => ({
    popup: {
        minWidth: "500px"
    },
    title: {
        fontSize: "2rem"
    },
    boxContent: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}))

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: TodoItem | null
    setData: React.Dispatch<React.SetStateAction<TodoItem | null>>
    handleFlag: (id: string) => Promise<any>
    deleteTodoItem: (id: string) => Promise<any>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({ open, setOpen, data, setData, handleFlag, deleteTodoItem }: Props) {
    const classes = useStyles()

    const Theme = useContext<CThemeContext | undefined>(themeContext)

    function handleClose() {
        setOpen(false);
        setData(null)
    }

    function handleFlagItem(id: string) {
        const { name, createdAt, flag, _id, deadline } = data as TodoItem
        const newData: TodoItem = {
            name, createdAt, _id, deadline,
            flag: !flag,
            completedAt: flag ? new Date(0) : new Date()
        }
        setData(newData)
        handleFlag(id as string)
    }

    function handleDeleteItem(id: string) {
        deleteTodoItem(id as string)
        setOpen(false)
    }



    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={classes.popup}
                fullWidth
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <Typography className={classes.title}>
                        {Capitalized(data?.name as String)}
                    </Typography>
                </DialogTitle>

                <Box className={classes.boxContent}>
                    <DialogContent>
                        <DialogContentText>
                            <b>Created At:</b> <br /> &nbsp; &nbsp; &nbsp; {getFullDateTime(data?.createdAt as Date)}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <DialogContentText>
                            <b>Deadline:</b> <br /> &nbsp; &nbsp; &nbsp; {getFullDateTime(data?.deadline as Date)}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <DialogContentText>
                            <b>Completed At:</b> <br /> &nbsp; &nbsp; &nbsp; {data?.completedAt.getTime() === new Date(0).getTime() ? "NOT COMPLETED" : getFullDateTime(data?.completedAt as Date)}
                        </DialogContentText>
                    </DialogContent>
                </Box>


                <DialogActions>
                    <Button onClick={() => handleFlagItem(data?._id as string)} color="inherit">
                        {data?.flag ? "Mark as not done" : "Mark as done"}
                    </Button>
                    <Button onClick={() => handleDeleteItem(data?._id as string)} color="inherit">
                        Delete item
                    </Button>
                    <Button onClick={handleClose} color={Theme?.darkTheme ? "secondary" : "primary"}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Capitalized(str: String): String {
    const tempStr = str.toLowerCase().split(" ")
    return tempStr.map(str => str && (str[0].toUpperCase() + str.slice(1))).join(" ")
}

function getFullDateTime(date: Date): string {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ", " + (date.getDate() < 10 ? "0" : "") + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}