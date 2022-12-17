import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlaidLink } from 'react-plaid-link'
import { exchangePublicTokenToAccess } from "../actions/actionCreators";


const PlaidLink = () => {
    const linkToken = useSelector(store => store.plaid.linkToken);
    const dispatch = useDispatch();
    const onSuccess = useCallback(
        (publicToken) => {
            dispatch(exchangePublicTokenToAccess(publicToken))
        }
    )
    const { open, ready } = usePlaidLink({
        token: linkToken? linkToken.link_token : '',
        onSuccess
    })
    
    
    return <button onClick={open}>Open Link</button>
}

export default PlaidLink