import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, storeUser } from '../actions/actionCreators'
import { Paper } from '@mui/material';
import useAlert from '../hooks/useAlert'; 
import BanklyApi from '../BanklyAPI';
import LoadingPage from './LoadingPage';


function SignIn({setToken}) {
    const dispatch = useDispatch()
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate();
    const [alert, createAlert] = useAlert()
    const handleSubmit = async (data) => {
        try {
            let res = await BanklyApi.login(data)
            dispatch(removeUser())
            setToken(res.token)
            dispatch(storeUser(res.token))
        } catch (e) {
            createAlert(e, 'error')
        }

    };
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: handleSubmit
    })

    useEffect(() => {
        if (user) {
            if (user.token) {
                navigate('/')
            }
        }
    }, [user, navigate])

    if (!user) {
        return <LoadingPage></LoadingPage>
    }

    return (
            <Container component={Paper} maxWidth="xs" sx={{my: 'auto'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {alert}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to='/signup' variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}

export default SignIn