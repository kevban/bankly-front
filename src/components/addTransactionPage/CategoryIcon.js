import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import getIcon from '../../icons'


const CategoryIcon = ({ category, selected=true, handleClick=(() => {}) }) => {
    if (!category) {
        return <div style={{width: '80px', height: '80px'}}></div>
    }
    return (
        <div onClick={() => handleClick(category)} style={{width: '80px', height: '80px'}}>
            {selected? <Avatar style={{ backgroundColor: category.color }} sx={{mx: 'auto'}}>{getIcon(category)}</Avatar>:
            <Avatar sx={{mx: 'auto'}}>{getIcon(category)}</Avatar>}
            <p style={{textAlign: 'center', fontSize: '12px'}}>{category.name}</p>
        </div>
    )
}

export default CategoryIcon