import React, { useContext } from 'react';

import { Grid, Button, Typography, Toolbar, AppBar, makeStyles, Theme } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { userContext, CUserContext } from "../../../App"
import { themeContext, CThemeContext } from "../Home"
import logout from '../../../services/logout';

const useStyles = makeStyles((theme: Theme) => ({
    appbar: {
        backgroundColor: "#252a34"
    },
    root: {
        flexGrow: 1,
    },
    logo: {
        height: "100%",
        color: "#08d9d6",
        marginRight: theme.spacing(1),
    },
    svg: {
        marginLeft: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(3)
    }
}))

export default function Appbar(): JSX.Element {
    const classes = useStyles();

    const User = useContext<CUserContext | undefined>(userContext)
    const Theme = useContext<CThemeContext | undefined>(themeContext)

    async function handleLogout() {
        const { isAuthenticated } = await logout.post()
        if (isAuthenticated) {
            User?.setUserAuthentication(false)
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <DoneOutlineIcon className={classes.logo} />
                                <Typography variant="h5" display="inline">
                                    TodoApp
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" color="inherit" className={classes.button} onClick={handleLogout}>Logout</Button>
                            <Button variant="outlined" color="inherit" className={classes.button}
                                onClick={() => Theme?.setDarkTheme(prev => !prev)}>
                                {Theme?.darkTheme ? "LIGHT" : "DARK"} <Brightness4Icon className={classes.svg} />
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

