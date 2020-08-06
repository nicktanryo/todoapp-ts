import React, { useContext } from 'react'

import { Link, Typography, makeStyles, Grid } from "@material-ui/core"
import { Formik, Form } from "formik"

import Copyright from "../Copyright"
import FormikField from "../FormikField"
import FormButton from "../FormButton"

import { IUserRegister } from "../../interfaces/interfaces"
import { registerValidation } from "../../validationSchema/schema"
import { userContext, CUserContext } from "../../App"
import register from '../../services/register'

// styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        margin: theme.spacing(4),
        justifyContent: 'center',
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    link: {
        marginTop: theme.spacing(6)
    }
}))

// initialValues
const initialValues = {
    username: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function Register(props: any) {
    const classes = useStyles()

    const User: CUserContext | undefined = useContext<CUserContext | undefined>(userContext)

    async function onSubmit(user: IUserRegister): Promise<void> {
        const { isAuthenticated, data: { username } } = await register.post(user)

        if (isAuthenticated) {
            User?.setUserAuthentication(true)
            User?.setUsername(username)
        }
    }

    return (
        <div className={classes.paper}>
            <Formik initialValues={initialValues} validationSchema={registerValidation} onSubmit={onSubmit}>
                <Form className={classes.form}>
                    <Typography variant="h3" className={classes.title}>
                        Register
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="fName"
                                    type="text"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="lName"
                                    type="text"
                                    label="Last Name"
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="username"
                                    type="text"
                                    label="Username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="password"
                                    type="password"
                                    label="Password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormikField
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Link className={classes.link}
                                href="/login">Have an account ? sign in now</Link>
                            <FormButton>
                                REGISTER
                            </FormButton>
                        </Grid>

                    </Grid>
                </Form>
            </Formik>

            <Copyright />
        </div>
    )
}

