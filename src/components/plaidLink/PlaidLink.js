import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlaidLink } from 'react-plaid-link'
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BanklyApi from "../../BanklyAPI";
import { storeUser, updateTransactions } from "../../actions/actionCreators";


const PlaidLink = () => {
    const linkToken = useSelector(store => store.plaid.linkToken);
    const dispatch = useDispatch();
    const onSuccess = useCallback(
        async (publicToken) => {
            console.log('success')
            await BanklyApi.setAccessToken(publicToken)
            await dispatch(storeUser())
            await dispatch(updateTransactions())
        }, [dispatch]
    )
    const { open } = usePlaidLink({
        token: linkToken ? linkToken.link_token : '',
        onSuccess
    })


    return <ListItemButton onClick={open} sx={{width: '100%'}}>
        <ListItemAvatar>
            <Avatar><AddIcon /></Avatar>
        </ListItemAvatar>
        <ListItemText primary="Connect a new bank to your account"></ListItemText>
    </ListItemButton>
}

export default PlaidLink