
import './App.css';
import { getTransaction } from './actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux';
import PlaidView from './components/PlaidView';
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Signup';
import SignIn from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const dispatch = useDispatch()
  const userId = useSelector(store => store.plaid.userId)
  const fetchTransaction = () => {
    console.log(userId)
    dispatch(getTransaction(userId));
  }
  return (
    <div className="App">
      <Routes>
        <Route exact path='/signup' element={<SignUp></SignUp>}></Route>
        <Route exact path='/login' element={<SignIn></SignIn>}></Route>
        <Route exact path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path = '*' element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
