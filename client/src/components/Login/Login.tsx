import React, { useContext } from 'react'
import { Link, Typography, makeStyles, Grid } from "@material-ui/core"
import { Formik, Form } from "formik"

import Copyright from "../Copyright"
import FormikField from "../FormikField"
import FormButton from "../FormButton"

import login from "../../services/login"
import { loginValidation } from "../../validationSchema/schema"
import { userContext, CUserContext } from "../../App"
import { IUserLogin } from "../../interfaces/interfaces"

// styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        margin: theme.spacing(4)
    },
    form: {
        width: '40%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    link: {
        alignSelf: "flex-start",
        marginTop: theme.spacing(4)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: "red",
        fontSize: "0.8rem",
        alignSelf: "flex-end",
        margin: "0",
        padding: "0"
    }
}))

//form initial value
const initialValues = {
    username: "",
    password: ""
}

// Functional component
export default function Login(): JSX.Element {
    const classes = useStyles()
    const User: CUserContext | undefined = useContext<CUserContext | undefined>(userContext)

    const onSubmit = async (user: IUserLogin): Promise<void> => {
        const { isAuthenticated, data: { username } } = await login.post(user)
        if (isAuthenticated) {
            User?.setUserAuthentication(true)
            User?.setUsername(username)
        }
    }

    return (
        <div className={classes.paper}>
            <Formik initialValues={initialValues} validationSchema={loginValidation} onSubmit={onSubmit}>
                <Form className={classes.form}>
                    <Typography variant="h3" className={classes.title}>
                        Sign In
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormikField
                                name="username"
                                type="text"
                                label="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormikField
                                name="password"
                                type="password"
                                label="Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                href="/register">Do not have an account yet? sign up now</Link>
                            <FormButton>
                                LOG IN
                            </FormButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <Copyright />
        </div>
    )
}
