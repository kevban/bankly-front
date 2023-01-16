import { Container, Grid, Pagination, Stack } from '@mui/material'
import React from 'react'
import usePagination from '../../hooks/usePagination'
import CategoryIcon from './CategoryIcon'
import { v4 as uuid } from 'uuid'

const CategorySelectView = ({ categories, selected, handleClick, maxPage = 6 }) => {
    const [page, handlePagination] = usePagination()
    // to render empty boxes in stack
    const emptyCategories = Array(maxPage - categories.length % maxPage).fill(null);
    const pages = Math.ceil(categories.length / maxPage)
    return (<Stack justifyContent={'center'}>
        <Stack justifyContent={"space-evenly"} direction={"row"}>
            {
                categories.filter((val, idx) => {
                    return idx < (page * maxPage) && idx >= ((page - 1) * maxPage)
                }).map((category, idx) => {
                    return <CategoryIcon
                        key={uuid()}
                        category={category}
                        selected={selected ? selected.name === category.name : true}
                        handleClick={handleClick}
                    >
                    </CategoryIcon>
                })
            }
            {page == pages ?
                emptyCategories.map((val, idx) => {
                    return <CategoryIcon
                        key={uuid()}
                        handleClick={() => { }}
                    >
                    </CategoryIcon>
                }) : null
            }
        </Stack>
        <Pagination count={pages} sx={{ mx: 'auto' }} onChange={handlePagination}></Pagination>
    </Stack>)
}

export default CategorySelectView