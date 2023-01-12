import { Fab } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const AddTransactionButton = ({toggleDrawer}) => {
    return (
        <Fab color="primary" aria-label="add" onClick={(evt) => {
            toggleDrawer(evt)
        }} style={{
            position: 'absolute',
            bottom: 24,
            right: 24
        }}>
            <AddIcon />
        </Fab>
    )
}

export default AddTransactionButton