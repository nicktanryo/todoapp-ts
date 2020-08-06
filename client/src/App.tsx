import React, { useState, useEffect } from 'react'
import "./App.css"
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"

import login from "./services/login"

export interface CUserContext {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setUserAuthentication: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const userContext = React.createContext<CUserContext | undefined>(undefined)

export default function App(): JSX.Element {
    const [username, setUsername] = useState<string>("")
    const [userIsAuthenticated, setUserAuthentication] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        async function getlogin() {
            const { isAuthenticated, data: { username } } = await login.get()
            if (isAuthenticated) {
                setUsername(username)
            }
            setUserAuthentication(isAuthenticated)
        }
        getlogin()
    }, [])

    return (
        <Router>
            <userContext.Provider value={{ username, setUsername, setUserAuthentication }}>
                <div className="App">

                    {userIsAuthenticated === undefined ? null : (
                        <Switch>
                            <Route exact path="/"
                                component={() => userIsAuthenticated ? <Home /> : <Redirect to="/login" />}
                            />
                            <Route exact path="/login"
                                component={() => userIsAuthenticated ? <Redirect to="/" /> : <Login />}
                            />
                            <Route exact path="/register"
                                component={() => userIsAuthenticated ? <Redirect to="/" /> : <Register />}
                            />
                        </Switch>
                    )}
                </div>
            </userContext.Provider>
        </Router>
    )
}
