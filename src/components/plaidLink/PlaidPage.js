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
import { useNavigate } from 'react-router-dom';

function PlaidPage() {
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const generateToken = useCallback(
        () => {
            dispatch(getTokenAction())
        }
    )
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        generateToken();
    }, [generateToken])
    return (
        <Container component={Paper} maxWidth="xs" sx={{ my: 'auto' }}>
            {
                user ? <><CssBaseline />
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountBalanceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Let's connect to a bank!
                    </Typography>
                    <Box sx={{ mv: 3 }}>
                        <List sx={{width: '100%', maxHeight: '360px', overflow: 'auto'}}>
                            {user.banks.map(bank => {
                                return <BankListItem bank={bank} key={uuid()}></BankListItem>
                            })}
                        </List>
                        <PlaidLink></PlaidLink>
                        
                    </Box>
                    {user.banks.length > 0? <Button variant='contained' color='success' sx={{mb: 0}} onClick={() => navigate('/')}>Finish</Button> : null}
                </Box> </> : null
            }
            
        </Container>
    );
}

export default PlaidPage