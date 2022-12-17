
import './App.css';
import { getTransaction } from './actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux';
import PlaidView from './components/PlaidView';

function App() {
  const dispatch = useDispatch()
  const userId = useSelector(store => store.plaid.userId)
  const fetchTransaction = () => {
    console.log(userId)
    dispatch(getTransaction(userId));
  }
  return (
    <div className="App">
      <header className="App-header">
        <PlaidView></PlaidView>
        <button onClick={fetchTransaction}>Get transactions</button>
      </header>
    </div>
  );
}

export default App;
