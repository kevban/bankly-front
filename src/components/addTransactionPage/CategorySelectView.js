import { Grid, Pagination } from '@mui/material'
import React from 'react'
import usePagination from '../../hooks/usePagination'
import CategoryIcon from './CategoryIcon'

const CategorySelectView = ({ categories, selected, handleClick }) => {
    const [page, handlePagination] = usePagination()
    return (<>
        <Grid container>
            {
                categories.filter((val, idx) => {
                    return idx < (page * 6) && idx >= ((page - 1) * 6)
                }).map(category => {
                    return <Grid item xs={2}>
                        <CategoryIcon
                            category={category}
                            selected={selected ? selected.name === category.name : true}
                            handleClick={handleClick}
                        >
                        </CategoryIcon>
                    </Grid>
                })
            }
        </Grid>
        <Pagination count={Math.ceil(categories.length / 6)} sx={{ mx: 'auto' }} onChange={handlePagination}></Pagination>
    </>)
}

export default CategorySelectView