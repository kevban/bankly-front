import React from 'react';
import { useSelector } from 'react-redux'
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