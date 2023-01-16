import * as React from 'react'
import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link component={RouterLink} to='/' color="inherit" href="/">
                Bank.ly
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright