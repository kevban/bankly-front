import React from 'react'
import { Typography, Stack, Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return <Stack>
        <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
        >Welcome to Bank.ly</Typography>
        <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
        >Your one-stop-shop to all your personal finance needs!</Typography>
        <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} spacing='12px'>
            <Grid item><Button component={Link} to='/signup' variant='contained'>SIGN UP</Button></Grid>
            <Grid item><Button component={Link} to='/login' variant='outlined'>LOG IN</Button></Grid>
        </Grid>
    </Stack>
}

export default Welcome