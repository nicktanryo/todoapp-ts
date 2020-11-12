import React, { useState } from "react";
import {
    Grid,
    ThemeProvider,
    createMuiTheme,
    makeStyles,
} from "@material-ui/core";
import Appbar from "./Header/Appbar";
import Content from "./Content/Content";

const useStyles = makeStyles(() => ({
    home: {
        height: "100vh",
        display: "grid",
        gridTemplateRows: "min-content 1fr",
    },
    content: {
        height: "100%",
    },
}));

export interface CThemeContext {
    darkTheme: boolean;
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const themeContext = React.createContext<CThemeContext | undefined>(
    undefined
);

export default function Home(): JSX.Element {
    const classes = useStyles();
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const theme = createMuiTheme({
        palette: {
            type: darkTheme ? "dark" : "light",
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
                <Grid container direction="column" className={classes.home}>
                    <Grid item>
                        <Appbar />
                    </Grid>
                    <Grid item className={classes.content}>
                        <Content />
                    </Grid>
                </Grid>
            </themeContext.Provider>
        </ThemeProvider>
    );
}
