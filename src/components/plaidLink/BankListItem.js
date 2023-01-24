import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';

const BankListItem = ({ bank }) => {

    return <div>
        <ListItem secondaryAction={<CheckIcon color='success'/>}>
        <ListItemButton sx={{ width: '100%' }}>
            <ListItemIcon>
                {bank.logo ? <img alt='banklogo' src={`data:image/png;base64, ${bank.logo}`} height='38px' width='38px'></img> : <div height='38px' width='38px'><AccountBalanceIcon /></div>}
            </ListItemIcon>
            <ListItemText primary={bank.name}></ListItemText>
        </ListItemButton>
        </ListItem>
        
    </div>
}

export default BankListItem