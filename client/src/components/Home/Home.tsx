import React, { useState } from 'react'
import { Grid, ThemeProvider, createMuiTheme } from '@material-ui/core'
import Appbar from './Header/Appbar'
import Content from './Content/Content'

export interface CThemeContext {
    darkTheme: boolean
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const themeContext = React.createContext<CThemeContext | undefined>(undefined)

export default function Home(): JSX.Element {
    const [darkTheme, setDarkTheme] = useState<boolean>(false)
    const theme = createMuiTheme({
        palette: {
            type: darkTheme ? "dark" : "light"
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
                <div>
                    <Grid container direction="column">
                        <Grid item>
                            <Appbar />
                        </Grid>
                        <Grid item>
                            <Content />
                        </Grid>
                    </Grid>
                </div>
            </themeContext.Provider>
        </ThemeProvider>
    )
}
