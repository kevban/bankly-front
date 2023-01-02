
import './App.css';
import { getTransaction } from './actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Signup';
import SignIn from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import Copyright from './components/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BanklyAppBar from './components/appBar/BanklyAppBar';
import { Toolbar, Container, CssBaseline, Stack } from '@mui/material';
import Landing from './components/landingPage/Landing';
import Redirect from './Redirect';
import PlaidPage from './components/plaidLink/PlaidPage';


function App() {
  const dispatch = useDispatch()
  const userId = useSelector(store => store.plaid.userId)
  const fetchTransaction = () => {
    console.log(userId)
    dispatch(getTransaction(userId));
  }
  const mdTheme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: "flex"
          }}
        >
          <BanklyAppBar>
          </BanklyAppBar>
          <Stack sx={{ width: '80%', mx: 'auto' }}>
            <Toolbar />
            <Routes>
              <Route exact path='/signup' element={<SignUp></SignUp>}></Route>
              <Route exact path='/login' element={<SignIn></SignIn>}></Route>
              <Route exact path='/dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route exact path='/landing' element={<Landing></Landing>}></Route>
              <Route exact path='/connect' element={<PlaidPage></PlaidPage>}></Route>
              <Route exact path='/' element={<Redirect></Redirect>}></Route>
              <Route path='*' element={<h1>404 Not Found</h1>}></Route>
            </Routes>
            <Copyright sx={{ mt: 5, mb: 5 }} />
          </Stack>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
