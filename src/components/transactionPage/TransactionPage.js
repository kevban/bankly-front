import { Paper } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import TransactionsList from '../dashboard/TransactionsList'
import LoadingPage from '../LoadingPage'

const TransactionPage = () => {
    const user = useSelector(store => store.auth.user)
    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <Container component={Paper} sx={{mt: '20px', p: '20px', display: 'flex', flexDirection: 'column'}} >
            <TransactionsList maxPageLength={12}></TransactionsList>
        </Container>
    )
}

export default TransactionPage