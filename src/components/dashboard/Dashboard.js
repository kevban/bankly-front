import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../Copyright';
import BanklyAppBar from '../appBar/BanklyAppBar';
import { useDispatch, useSelector } from 'react-redux'
import { getTransaction } from '../../actions/actionCreators'
import DashboardContent from './DashboardContent';
import moment from 'moment'
import LoadingPage from '../LoadingPage';



function Dashboard() {
    const user = useSelector(store => {
        return store.auth.user
    })
    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return <div>
        <h1>Welcome back, {user ? user.user.first_name : null}</h1>
        <h3>{moment().format('YYYY-MM-DD')}</h3>
        <DashboardContent></DashboardContent>
    </div>
}

export default Dashboard