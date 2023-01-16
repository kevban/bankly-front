import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { register, removeUser, storeUser } from '../actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import Copyright from './Copyright';
import { Paper } from '@mui/material';
import useAlert from '../hooks/useAlert';
import BanklyApi from '../BanklyAPI';
import LoadingPage from './LoadingPage';
import * as Yup from 'yup'


function SignUp({ setToken }) {
  const user = useSelector(store => store.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [alert, createAlert] = useAlert()
  const handleSubmit = async (data) => {
    try {
      console.log(data)
      let res = await BanklyApi.register(data)
      await dispatch(removeUser())
      setToken(res.token)
      await dispatch(storeUser(res.token))
      navigate('/connect')
    } catch (e) {
      createAlert(e, 'error')
    }
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Username must be between 6 - 20 characters')
      .max(20, 'Username must be between 6 - 20 characters')
      .required('Please enter an username'),
    password: Yup.string()
      .min(6, 'Password must be between 6 - 20 characters')
      .max(20, 'Password must be between 6 - 20 characters')
      .required('Please enter a password'),
    firstName: Yup.string()
      .required('Please enter first name'),
    lastName: Yup.string()
      .required('Please enter last name'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter a valid email'),
  })

  useEffect(() => {
    if (user) {
      if (user.token) {
        navigate('/')
      }
    }
  }, [user])



  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema
  })


  if (!user) {
    return <LoadingPage></LoadingPage>
  }

  return (
    <Container component={Paper} maxWidth="xs" sx={{ my: 'auto' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 8
        }}
      >
        {alert}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                id="username"
                label="Username"
                autoFocus
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                id="firstName"
                label="First Name"
                autoFocus
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={formik.values.LastName}
                onChange={formik.handleChange}
                name="lastName"
                autoComplete="family-name"
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                autoComplete="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                id="password"
                autoComplete="new-password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to='/login' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp