import { Avatar } from '@mui/material'
import React from 'react'
import getIcon from '../../helpers/icons'


const CategoryIcon = ({ category, selected = true, handleClick = (() => { }), showName = true } ) => {
    if (!category) {
        return <div style={{ width: '80px', height: '80px' }}></div>
    }
    return (
        <div onClick={() => handleClick(category)} style={{ width: '80px', height: '80px', display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
            {selected ? <Avatar style={{ backgroundColor: category.color }} sx={{ mx: 'auto' }}>{getIcon(category)}</Avatar> :
                <Avatar sx={{ mx: 'auto' }}>{getIcon(category)}</Avatar>}
            {showName? <p style={{ textAlign: 'center', fontSize: '12px' }}>{category.name}</p> : null}
        </div>
    )
}

export default CategoryIcon