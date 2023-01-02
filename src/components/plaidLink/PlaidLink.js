import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlaidLink } from 'react-plaid-link'
import { exchangePublicTokenToAccess } from "../../actions/actionCreators";
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const PlaidLink = () => {
    const linkToken = useSelector(store => store.plaid.linkToken);
    const dispatch = useDispatch();
    const onSuccess = useCallback(
        (publicToken) => {
            dispatch(exchangePublicTokenToAccess(publicToken))
        }
    )
    const { open, ready } = usePlaidLink({
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