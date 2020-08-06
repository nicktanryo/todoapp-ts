import React, { ReactElement } from 'react'
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 0, 2)
    }
}))

interface Props {
    children: String
}

export default function FormButton({ children }: Props): ReactElement {
    const classes = useStyles()
    return (
        <Button
            className={classes.button}
            color="primary"
            fullWidth
            variant="contained"
            type="submit"
        >
            {children}
        </Button>
    )
}
