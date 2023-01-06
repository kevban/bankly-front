import { Dialog, Drawer } from '@mui/material';
import React, { useState } from 'react'
import AddTransactionButton from './AddTransactionButton';
import AddTransactionPage from './AddTransactionPage';

const AddTransactionDrawer = () => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <>
            <AddTransactionButton toggleDrawer={toggleDrawer(true)}></AddTransactionButton>
            <Drawer
                anchor={'top'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                {<AddTransactionPage closeDrawer={toggleDrawer(false)}></AddTransactionPage>}
            </Drawer>
        </>

    )
}

export default AddTransactionDrawer