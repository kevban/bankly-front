import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, List, Paper } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenAction } from "../../actions/actionCreators";
import PlaidLink from "./PlaidLink";
import BankListItem from './BankListItem';
import {v4 as uuid} from 'uuid'

function PlaidPage() {
    const banks = useSelector(store => store.plaid.banks.institutions)
    const dispatch = useDispatch()
    const generateToken = useCallback(
        () => {
            dispatch(getTokenAction())
        }
    )
    useEffect(() => {
        generateToken();
    }, [dispatch, generateToken])
    return (
        <Container component={Paper} maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '400px'
                }}
            >
                {alert}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountBalanceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Let's connect to a bank!
                </Typography>
                <Box sx={{ mv: 3 }}>
                    <List sx={{width: '100%', maxHeight: '360px', overflow: 'auto'}}>
                        {banks.map(bank => {
                            return <BankListItem bank={bank} key={uuid()}></BankListItem>
                        })}
                        {console.log('banks:', banks)}
                    </List>
                    <PlaidLink></PlaidLink>
                    
                </Box>
                {banks.length > 0? <Button variant='contained' color='success'>Finish</Button> : null}
            </Box>
        </Container>
    );
}

export default PlaidPage