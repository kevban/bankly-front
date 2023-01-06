import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import getIcon from '../../icons'


const CategoryIcon = ({ category, selected=true, handleClick }) => {
    
    return (
        <div onClick={() => handleClick(category)}>
            {selected? <Avatar style={{ backgroundColor: category.color }} sx={{mx: 'auto'}}>{getIcon(category)}</Avatar>:
            <Avatar sx={{mx: 'auto'}}>{getIcon(category)}</Avatar>}
            <p style={{textAlign: 'center', fontSize: '12px'}}>{category.name}</p>
        </div>
    )
}

export default CategoryIcon