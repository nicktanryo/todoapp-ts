import 'date-fns';
import React, { SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%"
    }
}))

interface Props {
    deadline: Date | null
    setDeadline: React.Dispatch<SetStateAction<Date | null>>
}

export default function MaterialUIPickers({ deadline, setDeadline }: Props) {
    const classes = useStyles()

    const handleDateChange = (date: Date | null) => {
        setDeadline(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="row" justify="space-between" spacing={1} className={classes.container}>
                <Grid item xs={12} sm={6} md={5}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Deadline Date"
                        value={deadline}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Deadline Time"
                        value={deadline}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

