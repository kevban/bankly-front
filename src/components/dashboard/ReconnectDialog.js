import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser, updateTransactions, clearPlaidLink } from '../../actions/actionCreators';

function ReconnectDialog() {

    const updateLink = useSelector(store => store.plaid.updateLink)
    const dispatch = useDispatch()


    const onSuccess = useCallback(
        (publicToken) => {
            dispatch(storeUser())
            dispatch(updateTransactions())
            dispatch(clearPlaidLink())
        }
    )

    const onExit = useCallback(
        () => {
            dispatch(clearPlaidLink())
        }
    )


    const { open, ready } = usePlaidLink({
        token: updateLink ? updateLink.link_token : '',
        onSuccess,
        onExit
    })

    return (
        <>
            <Dialog
                open={updateLink ? true : false}
                onClose={onExit}
            >
                <DialogTitle>Reconnect</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please log in again to your financial institutions
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onExit} color="secondary" variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={open} color="primary" variant='outlined'>
                        Reconnect
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ReconnectDialog
