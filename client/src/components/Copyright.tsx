import React from 'react'
import { Typography, Link } from "@material-ui/core"

export default function Copyright(): JSX.Element {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.github.com/nicktanryo">
                Nicholas Tanryo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}