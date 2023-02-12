
import './App.css';
import { storeUser, updateTransactions } from './actions/actionCreators'
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Signup';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import Box from '@mui/material/Box';
import BanklyAppBar from './components/appBar/BanklyAppBar';
import { Toolbar, Stack, useMediaQuery } from '@mui/material';
import Landing from './components/landingPage/Landing';
import Redirect from './Redirect';
import PlaidPage from './components/plaidLink/PlaidPage';
import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import BanklyApi from './BanklyAPI';
import TransactionPage from './components/dashboard/TransactionPage';
import EditTransactionPage from './components/addTransactionPage/EditTransactionPage';
import RulesPage from './components/addRulePage/RulesPage';


function App() {
  // used to determine the screen size for responsive display
  const smScreen = useMediaQuery(
    '(max-width:800px)'
  )
  // getting jwt token from localStorage
  const [token, setToken] = useLocalStorage('token');
  const dispatch = useDispatch()
  useEffect(() => {
    // storing jwt token to the bankly API file
    BanklyApi.token = token;
    // storing user information to redux store
    dispatch(storeUser(token))
    // fetching user transactions from back end
    dispatch(updateTransactions())
  }, [token, dispatch])
  return (
    <div className="App">
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: "flex"
          }}
        >
          <BanklyAppBar>
          </BanklyAppBar>
          <Stack sx={{ width: smScreen? '90%' : "80%", mx: 'auto' }}>
            <Toolbar />
            <Routes>
              <Route exact path='/signup' element={<SignUp setToken={setToken}></SignUp>}></Route>
              <Route exact path='/login' element={<SignIn setToken={setToken}></SignIn>}></Route>
              <Route exact path='/dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route exact path='/transactions' element={<TransactionPage></TransactionPage>}></Route>
              <Route exact path='/transactions/:id' element={<EditTransactionPage></EditTransactionPage>}></Route>
              <Route exact path='/landing' element={<Landing></Landing>}></Route>
              <Route exact path='/connect' element={<PlaidPage></PlaidPage>}></Route>
              <Route exact path='/rules' element={<RulesPage></RulesPage>}></Route>
              <Route exact path='/' element={<Redirect></Redirect>}></Route>
              <Route path='*' element={<h1>404 Not Found</h1>}></Route>
            </Routes>
          </Stack>
        </Box>
    </div>
  );
}

export default App;
