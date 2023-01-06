import { List, Paper } from '@mui/material'
import { Container } from '@mui/system'
import { v4 as uuid } from 'uuid'
import React from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage'

const BankPage = () => {
    const user = useSelector(store => store.auth.user)
    if (!user) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <Container component={Paper}>
            <List sx={{ width: '100%', maxHeight: '360px', overflow: 'auto' }}>
                {user.banks.map(bank => {
                    return <BankListItem bank={bank} key={uuid()}></BankListItem>
                })}
            </List>
        </Container>
    )
}

export default BankPage